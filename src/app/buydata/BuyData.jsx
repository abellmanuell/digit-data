import AlertDialog from "@/components/AlertDialog";
import FieldInfo from "@/components/FieldInfo";
import FormInput from "@/components/FormInput";
import FormSelect from "@/components/FormSelect";
import Heading from "@/components/Heading";
import SubmitButton from "@/components/SubmitButton";
import { useForm } from "@tanstack/react-form";
import fetcher from "../../hooks/useFetch";
import React, { useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import { TokenContext, UserContext } from "../../contexts/context";
import topUpServices from "../../services/topup.service";
import Wrapper from "@/components/Wrapper";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/components/ui/select";
import Paragraphing from "@/components/Paragraphing";
import ResponseSpinner from "@/components/ResponseSpinner";

export default function BuyData() {
  const { token, setToken } = useContext(TokenContext);
  const { user, setUser } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const [buyData, setBuyData] = useState(null);
  const [networks, setNetworks] = useState([]);
  const [buyDataProps, setBuyDataProps] = useState({});
  const [dataPlans, setDataPlans] = useState([]);
  const [gifting, setGifting] = useState([]);
  const [smeNetwork, setSME] = useState([]);
  const [corporate, setCorporate] = useState([]);
  const [spinner, setSpinner] = useState({
    isPageLoading: false,
    isResponseLoading: false,
  });

  /* TRIGGER ACTION TO PURCHASE AIRTIME */
  async function buy(data, token) {
    setSpinner({ ...spinner, isResponseLoading: true });
    const request = await topUpServices.buyData(
      { ...data, ...buyDataProps },
      token
    );

    if (request.status >= 200 && request.status <= 299) {
      setUser(request.data);
      toast.success(request.message);
    } else {
      toast.error(request.message);
    }
    setSpinner({ ...spinner, isResponseLoading: false });
  }

  /* Get Networks */
  async function loadNetwork() {
    try {
      const networks = await fetcher.get("/api/networks");
      const dataPlans = await fetcher.get("/api/data-plans", token);

      if (
        (networks.status && dataPlans.status) >= 200 &&
        (networks.status && dataPlans.status) <= 299
      ) {
        setNetworks(networks.data);
        setDataPlans(dataPlans.data);
        setSpinner({ ...spinner, isPageLoading: true });
        return;
      }

      toast.error("Unexpected error occurred!");
    } catch {
      throw new Error();
    }
  }

  React.useEffect(() => {
    loadNetwork();
  }, []);

  const form = useForm({
    defaultValues: {
      network: 0 || "",
      mobile_number: 0 || "",
    },
    onSubmit: async ({ value }) => {
      setBuyData(value);
    },
    validators: {
      onChange: ({ value }) => {
        return {
          fields: {
            network: !value.network ? "Network is required" : undefined,
            mobile_number: !value.mobile_number
              ? "Mobile Number is required"
              : undefined,
          },
        };
      },
    },
  });

  return !spinner.isPageLoading ? (
    <div className="flex justify-center items-center h-screen">
      <ClipLoader color="#000" size={100} />
    </div>
  ) : (
    <Wrapper>
      <ResponseSpinner spinner={spinner} />

      <Toaster position="top-left" reverseOrder={true} />
      <div className="my-10">
        <Heading className="mb-1">Buy Mobile Data Instantly</Heading>
        <Paragraphing>
          Stay connected with fast and easy data top-ups.
        </Paragraphing>
      </div>
      <form
        className="mb-10"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          const { mobile_number } = form.state.values;
          if (!mobile_number) {
            toast.error("Please enter mobile number");
            return;
          }
          form.handleSubmit();
          setIsOpen(true);
        }}
      >
        <section className="grid grid-cols-[100px_1fr]">
          <div>
            <form.Field
              name="network"
              mode="array"
              children={(field) => {
                const defaultValue =
                  networks.length > 0 ? networks[0].name : ""; // Get first item's name

                const handleChange = (value) => {
                  for (let plan in dataPlans) {
                    if (
                      dataPlans[plan].ALL[0].plan_network.toLowerCase() ===
                      value.toLowerCase()
                    ) {
                      const gifting = dataPlans[plan].ALL.filter(
                        (plan_type) =>
                          plan_type.plan_type.toLowerCase() === "gifting"
                      );

                      const sme = dataPlans[plan].ALL.filter(
                        (plan_type) =>
                          plan_type.plan_type.toLowerCase() === "sme"
                      );

                      const corporate = dataPlans[plan].ALL.filter(
                        (plan_type) =>
                          plan_type.plan_type.toLowerCase() ===
                          "corporate gifting"
                      );

                      setCorporate(corporate.length > 0 ? corporate : []);
                      setSME(sme.length > 0 ? sme : []);
                      setGifting(gifting.length > 0 ? gifting : []);
                    }
                  }
                  field.handleChange(value);
                };

                useEffect(() => {
                  if (defaultValue) {
                    handleChange(defaultValue);
                  }
                }, [defaultValue]);

                return (
                  <div>
                    <Select
                      name={field.name}
                      onValueChange={handleChange} // Updated handler
                      value={field.state.value || defaultValue}
                      defaultValue={defaultValue}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select network" />
                      </SelectTrigger>
                      <SelectContent>
                        {networks.map((item) => (
                          <SelectItem key={item._id} value={item.name}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                );
              }}
            />
          </div>

          <div>
            <form.Field
              name="mobile_number"
              children={(field) => {
                return (
                  <>
                    <FormInput
                      divClassName="my-0"
                      type="number"
                      placeholder="Enter mobile number"
                      name={field.name}
                      value={field.state.value}
                      field={field}
                    ></FormInput>
                  </>
                );
              }}
            />
          </div>
        </section>
        <section className="mt-8">
          <Tabs defaultValue="gifting">
            <TabsList>
              <TabsTrigger value="gifting">Gifting</TabsTrigger>
              <TabsTrigger value="sme">SME</TabsTrigger>

              <TabsTrigger value="corporate">Corperate Gifting</TabsTrigger>
            </TabsList>
            <TabsContent value="gifting">
              <NetworkCard setBuyDataProps={setBuyDataProps} data={gifting} />
            </TabsContent>
            <TabsContent value="sme">
              <NetworkCard
                setBuyDataProps={setBuyDataProps}
                data={smeNetwork}
              />
            </TabsContent>
            <TabsContent value="corporate">
              <NetworkCard setBuyDataProps={setBuyDataProps} data={corporate} />
            </TabsContent>
          </Tabs>
        </section>
      </form>

      <section>
        <Paragraphing className="font-bold mb-4">
          Codes for Data Balance
        </Paragraphing>
        <Paragraphing>
          Glo <b>*127*0#</b>
        </Paragraphing>
        <Paragraphing>
          MTN [SME]
          <b>*461*4#</b>
        </Paragraphing>
        <Paragraphing>
          MTN [Gifting] <b>*131*4# or *460*260#</b>
        </Paragraphing>
        <Paragraphing>
          9mobile [Gifting]
          <b>*228#</b>
        </Paragraphing>
        <Paragraphing>
          Airtel <b>*140#</b>
        </Paragraphing>
      </section>

      <AlertDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onCancel={() => setIsOpen(false)}
        onSubmit={() => {
          setIsOpen(false);
          form.reset();
          const { _id } = networks.find(
            (network) => network.name === buyData.network
          );
          buy({ ...buyData, network: _id }, token);
        }}
      />
    </Wrapper>
  );
}

/* Data Network */
const NetworkCard = ({ data, setBuyDataProps }) => {
  return (
    <div className="mt-4 mb-4">
      <div className=" grid grid-cols-3 sm:grid-cols-5 md:grid-cols-4 lg:grid-cols-6 gap-2">
        {data.map(({ plan, month_validate, plan_amount, ...others }) => {
          return (
            <button
              type="submit"
              key={plan}
              className="py-4 px-2 border hover:border-gray-100 flex flex-col relative items-center space-y-1 rounded-md group text-gray-800"
              onClick={() =>
                setBuyDataProps({
                  plan,
                  month_validate,
                  plan_amount,
                  ...others,
                })
              }
            >
              <p className="text-sm text-center font-medium">{plan}</p>
              <p className="text-sm text-center">{month_validate}</p>
              <p className="text-sm text-center">
                {" "}
                <span className="text-xs">₦</span>
                {Intl.NumberFormat().format(plan_amount)}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
};
