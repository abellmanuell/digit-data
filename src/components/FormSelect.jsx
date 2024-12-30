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
        name={field.name}
        onValueChange={field.handleChange}
        value={field.state.value}
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
