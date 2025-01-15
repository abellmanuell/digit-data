import React from "react";
import { cn } from "../utils/cn";
import { Link } from "react-router-dom";

export default function Transactions({ name, href, className, children }) {
  return (
    <Link to={href} className="block max-w-[300px]">
      <div
        className={cn(
          "rounded-md p-5 my-5 flex items-center space-x-5",
          className
        )}
      >
        <div>{children}</div>
        <div>
          <h3 className="font-bold">{name}</h3>
        </div>
      </div>
    </Link>
  );
}
