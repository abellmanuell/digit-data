import React from "react";
import { cn } from "../utils/cn";
import FieldInfo from "./FieldInfo";

function FormInput({
  fieldInfo: { name, placeholder, isRequired = true },
  field,
}) {
  return (
    <>
      <div className="relative my-6">
        <input
          type={name}
          name={name}
          value={field.state.meta.value}
          onBlur={field.handleBlur}
          onChange={(e) => field.handleChange(e.target.value)}
          className="w-full border p-4 rounded-md text-sm peer placeholder:text-transparent"
          placeholder={placeholder}
          required={isRequired}
        />
        <label
          id={name}
          className={cn(
            "text-sm",
            "absolute -top-5 left-0",
            "peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-placeholder-shown:left-4 peer-focus:-top-5 peer-focus:left-0 peer-focus:text-black peer-focus:after:text-red-500 peer-placeholder-shown:after:text-gray-400",
            "after:content-['*']  transition-all"
          )}
        >
          {placeholder}
        </label>
        <FieldInfo field={field} />
      </div>
    </>
  );
}

export default FormInput;
