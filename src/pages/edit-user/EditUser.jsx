import React, { useContext } from "react";
import Heading from "@/components/Heading";
import { useForm } from "@tanstack/react-form";
import FormInput from "@/components/FormInput";
import SubmitButton from "@/components/SubmitButton";
import { TokenContext, UserContext } from "../../contexts/context";
import toast, { Toaster } from "react-hot-toast";
import userServices from "../../services/user.service";

export default function EditUser() {
  const { user, setUser } = useContext(UserContext);
  const { token, setToken } = useContext(TokenContext);
  const form = useForm({
    defaultValues: {
      email: user?.email ?? "",
      given_name: user?.given_name ?? "",
      family_name: user?.family_name ?? "",
      phone_number: user?.phone_number ?? "",
    },
    onSubmit: async ({ value }) => {
      const request = await userServices.updateUser(value, token);
      if (request.status >= 200 && request.status <= 299) {
        setUser(request.data);
        toast.success(request.message);
      } else {
        toast.error(request.message);
      }
    },
  });

  return (
    <div className="w-full md:w-[500px]">
      <Toaster toast={toast} />
      <Heading className="my-10">Edit Profile</Heading>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <section>
            <div>
              <form.Field
                name="given_name"
                validators={{
                  onChange: ({ value }) =>
                    value.length < 3
                      ? "Must be greater than 3 character"
                      : undefined,
                }}
                children={(field) => {
                  return (
                    <>
                      <FormInput
                        type="text"
                        name={field.name}
                        value={field.state.value}
                        label="First name"
                        field={field}
                      />
                    </>
                  );
                }}
              />
            </div>
            <div>
              <form.Field
                name="family_name"
                children={(field) => {
                  return (
                    <>
                      <FormInput
                        type="text"
                        name={field.name}
                        label="Last name"
                        field={field}
                      />
                    </>
                  );
                }}
              />
            </div>
            <div>
              <form.Field
                name="email"
                children={(field) => {
                  return (
                    <>
                      <FormInput
                        type="email"
                        name={field.name}
                        label="Email Address"
                        field={field}
                        disabled={true}
                      />
                    </>
                  );
                }}
              />
            </div>
            <div>
              <form.Field
                name="phone_number"
                children={(field) => {
                  return (
                    <>
                      <FormInput
                        type="number"
                        name={field.name}
                        label="Phone Number"
                        field={field}
                      />
                    </>
                  );
                }}
              />
            </div>
          </section>
          <SubmitButton formSubscribe={form} value="Update" />{" "}
        </form>
      </div>
    </div>
  );
}
