import FormInput from "@/components/FormInput";
import FormSelect from "@/components/FormSelect";
import Heading from "@/components/Heading";
import SubmitButton from "@/components/SubmitButton";
import { useForm } from "@tanstack/react-form";
import React from "react";

export default function BuyAirtime() {
  const form = useForm({
    defaultValues: {
      networks: [],
      airtime_types: [],
      mobile_number: 0 || undefined,
      amount: 0 || undefined,
    },
  });
  return (
    <div>
      <Heading className="my-10">Buy Airtime</Heading>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <div>
          <form.Field
            name="networks"
            children={(field) => {
              return (
                <FormSelect
                  placeholder="Select Network"
                  items={[
                    { value: "mtn", name: "MTN" },
                    { value: "airtel", name: "Airtel" },
                    { value: "glo", name: "GLO" },
                  ]}
                />
              );
            }}
          />
        </div>
        <div>
          <form.Field
            name="airtime_types"
            children={(field) => {
              return (
                <FormSelect
                  placeholder="Select Airtime Type"
                  items={[
                    { value: "vtu", name: "VTU" },
                    { value: "share_sell", name: "Share or Sell" },
                  ]}
                />
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
                  />
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
                  />
                </>
              );
            }}
          />
        </div>
        <SubmitButton formSubscribe={form} value="Buy Airtime" />{" "}
      </form>
    </div>
  );
}
