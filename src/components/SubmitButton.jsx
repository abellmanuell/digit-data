import React from "react";
import { cn } from "../utils/cn";
import { BeatLoader } from "react-spinners";

export default function SubmitButton({ value, formSubscribe: form, ...props }) {
  return (
    <form.Subscribe
      selector={(state) => [state.canSubmit, state.isSubmitting]}
      children={([canSubmit, isSubmitting]) => {
        return (
          <button
            className={cn(
              "p-4 w-full rounded-md font-medium text-sm",
              "bg-gray-900 hover:bg-gray-950 text-white",
              "focus:ring focus:ring-gray-600",
              "transition-all",
              "disabled:bg-gray-950 disabled:opacity-50"
            )}
            type="submit"
            disabled={!canSubmit}
            {...props}
          >
            {isSubmitting ? <BeatLoader color="#ffffff" size="5px" /> : value}
          </button>
        );
      }}
    />
  );
}
