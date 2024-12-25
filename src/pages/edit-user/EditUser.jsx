import React, { useContext } from "react";
import Heading from "@/components/Heading";
import { useForm } from "@tanstack/react-form";
import FormInput from "@/components/FormInput";
import SubmitButton from "@/components/SubmitButton";
import { TokenContext, UserContext } from "../../contexts/context";
import fetcher from "../../hooks/useFetch";

export default function EditUser() {
  const { user, setUser } = useContext(UserContext);
  const { token, setToken } = useContext(TokenContext);
  const form = useForm({
    defaultValues: {
      email: user?.email,
      given_name: user?.given_name,
      family_name: user?.family_name,
      phone_number: user?.phone_number || "",
    },
    onSubmit: async ({ value }) => {
      console.log(value);
      const request = await fetcher.put("/api/user/profile/edit", value, token);
      console.log(request);
    },
  });

  return (
    <div>
      <Heading className="my-10">Edit Profile</Heading>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
            form.reset();
          }}
        >
          <section>
            <div>
              <form.Field
                name="given_name"
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
                        value={field.state.value}
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
                        value={field.state.value}
                        label="Email Address"
                        field={field}
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
                        type="text"
                        name={field.name}
                        value={field.state.value}
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
