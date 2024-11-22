import React from "react";
import { cn } from "../../utils/cn";

export default function Statement({ children, ...props }) {
  return <section className={cn(props.className)}>{children}</section>;
}
