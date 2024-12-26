import React from "react";
import { cn } from "../utils/cn";
import { CircleCheck, CircleX } from "lucide-react";

function FormInput({
  type,
  name,
  label,
  isRequired = false,
  field,
  children,
  className,
  ...props
}) {
  console.log(field.state.meta);
  const { isBlurred, isTouched, errors } = field.state.meta;
  return (
    <>
      <div className="relative my-8">
        <input
          type={type}
          name={name}
          value={field.state.value}
          onBlur={field.handleBlur}
          onChange={(e) => field.handleChange(e.target.value)}
          className={cn(
            "w-full border p-4 rounded-md text-sm peer placeholder:text-transparent",
            className
          )}
          placeholder={label}
          required={isRequired}
          {...props}
        />
        <label
          id={name}
          className={cn(
            "text-sm",
            "absolute -top-5 left-0",
            "peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-placeholder-shown:left-4 peer-focus:-top-5 peer-focus:left-0 peer-focus:text-black",
            label &&
              "peer-focus:after:text-red-500 peer-placeholder-shown:after:text-gray-400",
            isRequired && "after:content-['*']",
            "transition-all"
          )}
        >
          {label}
        </label>
        {/* <div className="absolute right-0 top-2 p-2">
          {console.log(isTouched)}
          {isTouched && errors.length == 0 ? (
            <CircleCheck className="text-green-500" />
          ) : undefined}
        </div> */}
        {children ? children : ""}
      </div>
    </>
  );
}

export default FormInput;
