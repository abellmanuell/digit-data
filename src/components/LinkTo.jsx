import { Link } from "react-router-dom";
import { cn } from "../utils/cn";

const LinkTo = ({ to, name, children, ...props }) => {
  return (
    <Link to={to} className={cn(props.className)}>
      {name} {children}
    </Link>
  );
};

export default LinkTo;
