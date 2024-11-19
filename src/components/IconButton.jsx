import { cn } from "../utils/cn";

/* eslint-disable react/prop-types */
function IconButton({ Icon, onClick, ...props }) {
  return (
    <button
      onClick={onClick}
      className={cn(props.className, "hover:text-tw-blue-100")}
    >
      <Icon className="w-6" />
    </button>
  );
}

export default IconButton;
