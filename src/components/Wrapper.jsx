import { cn } from "../utils/cn";

export default function Wrapper({ className, props, children }) {
  return (
    <div className={cn("w-full pt-6 pb-20 px-6 lg:px-20", className)}>
      {children}
    </div>
  );
}
