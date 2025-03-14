import { cn } from "../utils/cn";

function AuthButton({ value, icon: Icon, handleOauth, isLoading }) {
  return (
    <div>
      <button
        disabled={isLoading}
        onClick={handleOauth}
        className={cn(
          "text-sm text-gray-900",
          "border w-full my-4 p-4",
          "flex justify-center items-center rounded-md space-x-4",
          "hover:border-gray-200 disabled:opacity-70"
        )}
        type="button"
      >
        <Icon />
        <span>
          {!isLoading ? value : <BeatLoader color="#ffffff" size="5px" />}
        </span>
      </button>
    </div>
  );
}

export default AuthButton;
