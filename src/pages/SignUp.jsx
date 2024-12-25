import { useForm } from "@tanstack/react-form";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

import agentUtilization from "../assets/agent-utilization.avif";
import AccountInOutHeader from "@/components/AccountInOutHeader";
import FormInput from "@/components/FormInput";
import SubmitButton from "@/components/SubmitButton";
import { cn } from "../utils/cn";
import { useState } from "react";
import fetcher from "../hooks/useFetch";
import toast, { Toaster } from "react-hot-toast";
import AuthButton from "@/components/AuthButton";
import FieldInfo from "@/components/FieldInfo";

function setToken(name, token) {
  localStorage.setItem(name, token);
}

function getToken(token) {
  return localStorage.getItem(token);
}

function navigate(url) {
  window.location.href = url;
}

async function oauth() {
  try {
    const response = await fetch(
      import.meta.env.VITE_BASE_URL + "/google-oauth-request",
      {
        method: "POST",
      }
    );

    const { url } = await response.json();
    navigate(url);
  } catch {
    throw new Error("No Auth url");
  }
}

export default function SignUp() {
  if (getToken("token")) {
    navigate("/dashboard");
  }

  const [isPasswordShow, setIsPasswordShow] = useState(false);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      if (value.email && value.password) {
        const data = await fetcher.post("/signup", value);
        if (data.status >= 200 && data.status <= 299) {
          toast.success(data.message);
          form.reset();

          setToken("token", data.token);
          setToken("refresh_token", data.refresh_token);
        } else {
          toast.error(data.message);
        }
      } else {
        setIsPasswordShow(true);
      }
    },
  });

  const email = form.useStore((state) => state.values.email);
  return (
    <>
      <div>
        <Toaster position="top-left" reverseOrder={true} />
      </div>
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
                    onChangeAsyncDebounceMs: 500,
                    onChangeAsync: async ({ value }) => {
                      await new Promise((resolve) => setTimeout(resolve, 1000));
                    },
                  }}
                  children={(field) => {
                    return (
                      <>
                        <FormInput
                          type="email"
                          name={field.name}
                          value={field.state.value}
                          label="Email Address"
                          field={field}
                        >
                          <FieldInfo field={field} />
                        </FormInput>
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
                      onChangeAsyncDebounceMs: 500,
                      onChangeAsync: async ({ value }) => {
                        await new Promise((resolve) =>
                          setTimeout(resolve, 1000)
                        );
                      },
                    }}
                    children={(field) => {
                      return (
                        <>
                          <FormInput
                            type="password"
                            name={field.name}
                            value={field.state.value}
                            label="Password"
                            field={field}
                          >
                            <FieldInfo field={field} />
                          </FormInput>
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

          <div className="my-8">
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
    </>
  );
}
