import { Link } from "react-router-dom";
import { cn } from "../utils/cn";

const LinkTo = ({ to, name, ...props }) => {
  return (
    <Link to={to} className={cn(props.className)}>
      {name}
    </Link>
  );
};

export default LinkTo;
