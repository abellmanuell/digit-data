import { cn } from "../utils/cn";

export default function Paragraphing({ children, ...props }) {
  return <p className={cn(props.className, "text-sm py-2")}>{children}</p>;
}