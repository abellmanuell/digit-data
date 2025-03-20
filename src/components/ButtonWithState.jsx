import React from "react";
import { BeatLoader } from "react-spinners";
import { cn } from "../utils/cn";

export default function ButtonWithState({
  value,
  isSubmitting,
  className,
  ...props
}) {
  return (
    <button
      {...props}
      className={cn(
        "p-4 w-full rounded-md font-medium text-sm",
        "bg-gray-900 hover:bg-gray-950 text-white",
        "focus:ring focus:ring-gray-600",
        "transition-all",
        "disabled:bg-gray-950 disabled:opacity-50",
        className
      )}
      type="submit"
      disabled={isSubmitting}
    >
      {isSubmitting ? <BeatLoader color="#ffffff" size="5px" /> : value}
    </button>
  );
}
