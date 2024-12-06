import { useForm } from "@tanstack/react-form";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

import agentUtilization from "../assets/agent-utilization.avif";
import AccountInOutHeader from "@/components/AccountInOutHeader";
import FormInput from "@/components/FormInput";
import SubmitButton from "@/components/SubmitButton";
import { cn } from "../utils/cn";
import { useState } from "react";
import { useFetch } from "../../hooks/useFetch";

function navigate(url) {
  window.location.href = url;
}

async function oauth() {
  try {
    const response = await fetch("http://127.0.0.1:3000/google-oauth-request", {
      method: "POST",
    });

    const { url } = await response.json();
    navigate(url);
  } catch {
    throw new Error("No Auth url");
  }
}

export default function SignUp() {
  const [isPasswordShow, setIsPasswordShow] = useState(false);

  const form = useForm({
    onSubmit: async ({ value }) => {
      if (value.email && value.password) {
        useFetch("/signup", "POST", value);
        console.log(value);
      } else {
        setIsPasswordShow(true);
      }
    },
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const email = form.useStore((state) => state.values.email);
  return (
    <section className="h-full md:grid grid-cols-2">
      {/*****************************
       *      SIGN UP FORM           *
       *****************************/}
      <div className="sm:w-80 md:w-96 m-auto p-6">
        <AccountInOutHeader
          title="Create Your Account"
          description="Sign Up to Digit Data to continue to Digit Data."
        />

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="py-4"
        >
          <section>
            <div>
              <form.Field
                name="email"
                validators={{
                  onChange: ({ value }) =>
                    !value
                      ? "Email is required"
                      : value.length < 3
                      ? "Email must be at least 3 characters"
                      : undefined,
                  onChangeAsync: async ({ value }) => {
                    await new Promise((resolve) => setTimeout(resolve, 1000));
                  },
                }}
                children={(field) => {
                  return (
                    <>
                      <FormInput
                        fieldInfo={{
                          name: "email",
                          placeholder: "Email Address",
                        }}
                        field={field}
                        label="Enter Address"
                      />
                    </>
                  );
                }}
              />
            </div>

            {isPasswordShow && (
              <div>
                <form.Field
                  name="password"
                  validators={{
                    onChange: ({ value }) =>
                      !value
                        ? "Password is required"
                        : value.length < 8
                        ? "Passowrd must be at least 8 characters"
                        : undefined,
                    onChangeAsync: async ({ value }) => {
                      await new Promise((resolve) => setTimeout(resolve, 1000));
                    },
                  }}
                  children={(field) => {
                    return (
                      <>
                        <FormInput
                          fieldInfo={{
                            name: "password",
                            placeholder: "Password",
                          }}
                          field={field}
                          label="Password"
                        />
                      </>
                    );
                  }}
                />
              </div>
            )}
          </section>
          <SubmitButton formSubscribe={form} value="Continue" />
        </form>

        <p className="text-sm text-gray-600">
          Already have an accountt?{" "}
          <Link
            className="text-gray-900 font-medium hover:text-gray-950"
            to="/login"
          >
            Log in
          </Link>
        </p>

        <div className="my-10">
          <span
            className={cn("block w-full h-[0.5px] relative", "text-center")}
          >
            <span className="text-sm absolute -top-2.5 translate-[50px] text-muted-foreground">
              OR
            </span>
          </span>
        </div>

        <AuthButton
          value="Continue with Google"
          icon={FcGoogle}
          handleOauth={() => oauth()}
        />
      </div>

      {/*****************************
       *    RIGHTSIDER BANNER       *
       *****************************/}
      <div className="hidden md:block bg-black p-10 overflow-hidden">
        <div className="space-y-2 mb-20 py-6 text-center">
          <h1 className="text-3xl font-bold text-white">
            Make the change and see the change you want to see.
          </h1>
          <p className="text-gray-500">
            Get insights and actionable recommendations to optimize your CI
            pipelines.
          </p>
        </div>

        <img
          src={agentUtilization}
          alt="Agent Utilization"
          className="rounded-lg ring-8 ring-gray-500"
        />
      </div>
    </section>
  );
}

function AuthButton({ value, icon: Icon, handleOauth }) {
  return (
    <div>
      <button
        onClick={handleOauth}
        className={cn(
          "text-sm text-gray-900",
          "border w-full my-4 p-4",
          "flex justify-center items-center rounded-md space-x-4",
          "hover:border-gray-200"
        )}
        type="button"
      >
        <Icon />
        <span>{value}</span>
      </button>
    </div>
  );
}
