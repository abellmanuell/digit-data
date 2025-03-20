import React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/components/ui/select";
import { cn } from "../utils/cn";

export default function FormSelect({
  placeholder,
  items,
  children,
  field,
  className,
}) {
  return (
    <div className={cn("my-8", className)}>
      <Select
        name={field.name}
        onValueChange={field.handleChange}
        value={field.state.value}
        defaultValue="MTN"
      >
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {items.map((item) => {
            return (
              <SelectItem key={item._id} value={item.name}>
                {item.name}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
      {children ? children : ""}
    </div>
  );
}
