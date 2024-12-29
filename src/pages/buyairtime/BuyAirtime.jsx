import AlertDialog from "@/components/AlertDialog";
import FieldInfo from "@/components/FieldInfo";
import FormInput from "@/components/FormInput";
import FormSelect from "@/components/FormSelect";
import Heading from "@/components/Heading";
import SubmitButton from "@/components/SubmitButton";
import { useForm } from "@tanstack/react-form";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { ClipLoader } from "react-spinners";

export default function BuyAirtime() {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [buyAirtime, setBuyAirtime] = useState(null);

  const form = useForm({
    defaultValues: {
      network: "",
      airtime_type: "",
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

  return isLoading ? (
    <div className="flex justify-center items-center h-screen">
      <ClipLoader color="#000" loading={isLoading} size={100} />
    </div>
  ) : (
    <div className="w-full md:w-[500px]">
      <Toaster position="top-left" reverseOrder={true} />
      <Heading className="my-10">Buy Airtime</Heading>
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
                  items={[
                    { value: "mtn", name: "MTN" },
                    { value: "airtel", name: "Airtel" },
                    { value: "glo", name: "GLO" },
                  ]}
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
                  items={[
                    { value: "vtu", name: "VTU" },
                    { value: "share_sell", name: "Share or Sell" },
                  ]}
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
                    placeholder="Enter amount"
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
        <SubmitButton formSubscribe={form} value="Buy Airtime" />{" "}
      </form>

      <AlertDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onCancel={() => setIsOpen(false)}
        onSubmit={() => {
          setIsOpen(false);
          form.reset();
        }}
      />
    </div>
  );
}
