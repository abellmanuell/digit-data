import { cn } from "../utils/cn";

function AuthButton({ value, icon: Icon, handleOauth }) {
  return (
    <div>
      <button
        onClick={handleOauth}
        className={cn(
          "text-sm text-gray-900",
          "border w-full my-4 p-4",
          "flex justify-center items-center rounded-md space-x-4",
          "hover:border-gray-200"
        )}
        type="button"
      >
        <Icon />
        <span>{value}</span>
      </button>
    </div>
  );
}

export default AuthButton;
