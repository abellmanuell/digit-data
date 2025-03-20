import AlertDialog from "@/components/AlertDialog";
import FieldInfo from "@/components/FieldInfo";
import FormInput from "@/components/FormInput";
import FormSelect from "@/components/FormSelect";
import Heading from "@/components/Heading";
import { useForm } from "@tanstack/react-form";
import fetcher from "../../hooks/useFetch";
import React, { useContext, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import { TokenContext, UserContext } from "../../contexts/context";
import topUpServices from "../../services/topup.service";
import Wrapper from "@/components/Wrapper";
import ButtonWithState from "@/components/ButtonWithState";
import Paragraphing from "@/components/Paragraphing";

export default function BuyAirtime() {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [buyAirtime, setBuyAirtime] = useState(null);
  const [networks, setNetworks] = useState([]);
  const [airtimeType, setAirtimeType] = useState([]);
  const { token, setToken } = useContext(TokenContext);
  const { user, setUser } = useContext(UserContext);
  const [isSubmitting, setIsSubmitting] = useState(false);

  /* Get Networks */
  async function loadNetworkAndAirtimeType() {
    try {
      const networks = await fetcher.get("/api/networks");
      const airtimeType = await fetcher.get("/api/airtime-type");

      if (
        (networks.status && airtimeType.status) >= 200 &&
        (airtimeType.status && networks.status) < 299
      ) {
        setNetworks(networks.data);
        setAirtimeType(airtimeType.data);
        setIsLoading(true);
        return;
      }

      toast.error("Unexpected error occurred!");
    } catch {
      throw new Error();
    }
  }

  React.useEffect(() => {
    loadNetworkAndAirtimeType();
  }, []);

  const form = useForm({
    defaultValues: {
      network: 0 || "",
      airtime_type: 0 || "",
      mobile_number: 0 || "",
      amount: 0 || "",
    },
    onSubmit: async ({ value }) => {
      setBuyAirtime(value);
    },
    validators: {
      onChange: ({ value }) => {
        return {
          fields: {
            network: !value.network ? "Network is required" : undefined,
            amount: !value.amount ? "Amount is required" : undefined,
            mobile_number: !value.mobile_number
              ? "Mobile Number is required"
              : undefined,

            airtime_type: !value.airtime_type
              ? "Airtime Type is required"
              : undefined,
          },
        };
      },
    },
  });

  /* TRIGGER ACTION TO PURCHASE AIRTIME */
  async function buy(data, token) {
    setIsSubmitting(true);
    const request = await topUpServices.topUp(data, token);

    if (request.status >= 200 && request.status <= 299) {
      form.reset();
      setUser(request.data);
      toast.success(request.message);
      setIsSubmitting(false);
    } else {
      setIsSubmitting(false);
      toast.error(request.message);
    }
  }

  return !isLoading ? (
    <div className="flex justify-center items-center h-screen">
      <ClipLoader color="#000" size={100} />
    </div>
  ) : (
    <Wrapper>
      <Toaster position="top-left" reverseOrder={true} />
      <div className="my-10">
        <Heading className="mb-1">Buy Airtime Instantly</Heading>
        <Paragraphing>
          Top up your phone in seconds—anytime, anywhere.
        </Paragraphing>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          const { network, airtime_type, mobile_number, amount } =
            form.state.values;

          if (!network && !airtime_type && !mobile_number && !amount) {
            form.handleSubmit();
            return;
          }
          form.handleSubmit();
          setIsOpen(true);
        }}
      >
        <div>
          <form.Field
            name="network"
            mode="array"
            children={(field) => {
              return (
                <FormSelect
                  placeholder="Select Network"
                  items={networks}
                  field={field}
                >
                  <FieldInfo field={field} />
                </FormSelect>
              );
            }}
          />
        </div>
        <div>
          <form.Field
            name="airtime_type"
            children={(field) => {
              return (
                <FormSelect
                  placeholder="Select Airtime Type"
                  items={airtimeType}
                  field={field}
                >
                  <FieldInfo field={field} />
                </FormSelect>
              );
            }}
          />
        </div>
        <div className="my-8">
          <form.Field
            name="mobile_number"
            children={(field) => {
              return (
                <>
                  <FormInput
                    type="number"
                    placeholder="Enter mobile number"
                    name={field.name}
                    value={field.state.value}
                    field={field}
                  >
                    <FieldInfo field={field} />
                  </FormInput>
                </>
              );
            }}
          />
        </div>
        <div className="my-8">
          <form.Field
            name="amount"
            children={(field) => {
              return (
                <>
                  <FormInput
                    type="number"
                    placeholder="Enter amount Min. ₦100"
                    name={field.name}
                    value={field.state.value}
                    field={field}
                  >
                    <FieldInfo field={field} />
                  </FormInput>
                </>
              );
            }}
          />
        </div>
        <ButtonWithState isSubmitting={isSubmitting} value="Buy Airtime" />
      </form>

      <AlertDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onCancel={() => setIsOpen(false)}
        onSubmit={() => {
          setIsOpen(false);
          const { _id } = networks.find(
            (network) => network.name === buyAirtime.network
          );
          buy({ ...buyAirtime, network: _id }, token);
        }}
      />
    </Wrapper>
  );
}
