import React, { useContext, useEffect, useState } from "react";
import Heading from "@/components/Heading";
import { useForm } from "@tanstack/react-form";
import FormInput from "@/components/FormInput";
import SubmitButton from "@/components/SubmitButton";
import { TokenContext, UserContext } from "../../contexts/context";
import toast, { Toaster } from "react-hot-toast";
import userServices from "../../services/user.service";
import Wrapper from "@/components/Wrapper";
import { ClipLoader } from "react-spinners";
import ButtonWithState from "@/components/ButtonWithState";
import Paragraphing from "@/components/Paragraphing";

export default function EditUser() {
  const { user, setUser } = useContext(UserContext);
  const { token, setToken } = useContext(TokenContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      setIsLoading(true);
    }
  }, []);

  const form = useForm({
    defaultValues: {
      email: user?.email ?? "",
      given_name: user?.given_name ?? "",
      family_name: user?.family_name ?? "",
      mobile_number: user?.mobile_number ?? "",
    },
    onSubmit: async ({ value }) => {
      setIsSubmitting(true);
      const request = await userServices.updateUser(value, token);
      if (request.status >= 200 && request.status <= 299) {
        setUser(request.data);
        toast.success(request.message);
        setIsSubmitting(false);
      } else {
        toast.error(request.message);
        setIsSubmitting(false);
      }
    },
  });

  return !isLoading ? (
    <div className="flex justify-center items-center h-screen">
      <ClipLoader color="#000" size={100} />
    </div>
  ) : (
    <Wrapper>
      <Toaster toast={toast} />
      <div className="my-16">
        <Heading className="mb-1">Edit your profile</Heading>
        <Paragraphing>
          Update your details and personalize your experience.
        </Paragraphing>
      </div>

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
                        disabled={user?.google_id ? true : false}
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
                        disabled={user?.google_id ? true : false}
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
                name="mobile_number"
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
          <ButtonWithState isSubmitting={isSubmitting} value="Update" />
        </form>
      </div>
    </Wrapper>
  );
}
