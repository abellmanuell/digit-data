import { useForm } from "@tanstack/react-form";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

import ssplatform from "../assets/ssplatform.png";
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

export default function SignUp() {
  const [isGoogleAuthLoading, setIsGoogleAuthLoading] = useState(false);

  if (getToken("token")) {
    navigate("/dashboard");
  }

  async function oauth() {
    try {
      setIsGoogleAuthLoading(true);
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

  const [isPasswordShow, setIsPasswordShow] = useState(false);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      if (value.email && value.password) {
        const request = await fetcher.post("/signup", value);
        if (request.status >= 200 && request.status <= 299) {
          toast.success(request.message);
          form.reset();

          setToken("token", request.token);
        } else {
          toast.error(request.message);
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
            Already have an account?{" "}
            <Link
              className="text-gray-900 font-medium hover:text-gray-950"
              to="/signin"
            >
              Login
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
            value={isGoogleAuthLoading ? "Loading..." : "Continue with Google"}
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
              Stay Connected, <br /> Anytime,{" "}
              <span className="text-[#EF4848]">Anywhere!</span>
            </h1>
            <p className="text-gray-500">
              Easily buy data and airtime for easy browsing—fast, reliable, and
              stress-free!
            </p>
          </div>

          <img
            src={ssplatform}
            alt="SS Platform"
            className="rounded-lg ring-8 ring-gray-500"
          />
        </div>
      </section>
    </>
  );
}
