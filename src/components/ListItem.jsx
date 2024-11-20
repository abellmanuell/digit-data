import { cn } from "../utils/cn";

export default function ListItem({ children, ...props }) {
  return <li className={cn("p-2", props.className)}>{children}</li>;
}
