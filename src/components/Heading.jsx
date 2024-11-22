import { cn } from "../utils/cn";

const Heading = ({ children, ...props }) => {
  return <h1 className={cn("font-bold", props.className)}>{children}</h1>;
};

export default Heading;
