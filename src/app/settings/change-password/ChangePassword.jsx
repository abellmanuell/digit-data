import React, { useContext, useEffect, useState } from "react";
import Heading from "@/components/Heading";
import { useForm } from "@tanstack/react-form";
import FormInput from "@/components/FormInput";
import SubmitButton from "@/components/SubmitButton";
import { TokenContext, UserContext } from "../../../contexts/context";
import toast, { Toaster } from "react-hot-toast";
import userServices from "../../../services/user.service";
import Wrapper from "@/components/Wrapper";
import FieldInfo from "@/components/FieldInfo";

export default function ChangePassword() {
  const { user, setUser } = useContext(UserContext);
  const { token, setToken } = useContext(TokenContext);

  const form = useForm({
    defaultValues: {
      old_password: "",
      new_password: "",
      confirm_password: "",
    },
    onSubmit: async ({ value }) => {
      const { old_password, new_password, confirm_password } = value;

      if (!old_password || !new_password || !confirm_password) {
        toast.error("Please kindly filled in the blank field");
        return;
      }

      if (new_password !== confirm_password) {
        toast.error("New password do not match confirm password");
        return;
      }

      const request = await userServices.changePassword(value, token);
      if (request.status >= 200 && request.status <= 299) {
        form.reset();
        toast.success(request.message);
      } else {
        toast.error(request.message);
      }
    },
  });

  return (
    <Wrapper>
      <Toaster toast={toast} />
      <Heading className="my-10">Change Password</Heading>
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
                name="old_password"
                validators={{
                  onChange: ({ value }) =>
                    value.length < 8
                      ? "Password must be at least 8 characters"
                      : undefined,
                  onChangeAsyncDebounceMs: 500,
                  onChangeAsync: async ({ value }) => {
                    await new Promise((resolve) => setTimeout(resolve, 1000));
                  },
                }}
                children={(field) => {
                  return (
                    <>
                      <FormInput
                        type="password"
                        name={field.name}
                        value={field.state.value}
                        field={field}
                        label="Password"
                      >
                        <FieldInfo field={field} />
                      </FormInput>
                    </>
                  );
                }}
              />
            </div>

            <div>
              <form.Field
                name="new_password"
                validators={{
                  onChange: ({ value }) =>
                    value.length < 8
                      ? "Password must be at least 8 characters"
                      : undefined,
                  onChangeAsyncDebounceMs: 500,
                  onChangeAsync: async ({ value }) => {
                    await new Promise((resolve) => setTimeout(resolve, 1000));
                  },
                }}
                children={(field) => {
                  return (
                    <>
                      <FormInput
                        type="password"
                        name={field.name}
                        value={field.state.value}
                        field={field}
                        label="New Password"
                      >
                        <FieldInfo field={field} />
                      </FormInput>
                    </>
                  );
                }}
              />
            </div>

            <div>
              <form.Field
                name="confirm_password"
                validators={{
                  onChange: ({ value }) =>
                    value.length < 8
                      ? "Password must be at least 8 characters"
                      : undefined,
                  onChangeAsyncDebounceMs: 500,
                  onChangeAsync: async ({ value }) => {
                    await new Promise((resolve) => setTimeout(resolve, 1000));
                  },
                }}
                children={(field) => {
                  return (
                    <>
                      <FormInput
                        type="password"
                        name={field.name}
                        value={field.state.value}
                        field={field}
                        label="Confirm Password"
                      >
                        <FieldInfo field={field} />
                      </FormInput>
                    </>
                  );
                }}
              />
            </div>
          </section>
          <SubmitButton formSubscribe={form} value="Change Password" />{" "}
        </form>
      </div>
    </Wrapper>
  );
}
