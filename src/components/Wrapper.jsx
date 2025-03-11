import { cn } from "../utils/cn";

export default function Wrapper({ className, props, children }) {
  return (
    <div className={cn("w-full py-6 pr-6 lg:px-20", className)}>{children}</div>
  );
}
