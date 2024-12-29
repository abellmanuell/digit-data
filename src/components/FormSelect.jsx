import React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/components/ui/select";

export default function FormSelect({ placeholder, items, children, field }) {
  return (
    <div className="my-8">
      <Select
        onValueChange={field.handleChange}
        defaultValue={field.state.value}
      >
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {items.map((item) => {
            return (
              <SelectItem key={item.value} value={item.value}>
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
