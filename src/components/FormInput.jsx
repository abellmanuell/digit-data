import React from "react";
import { cn } from "../utils/cn";

function FormInput({
  type,
  name,
  value,
  label,
  isRequired = false,
  field,
  children,
  className,
  ...props
}) {
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
        {children ? children : ""}
      </div>
    </>
  );
}

export default FormInput;
