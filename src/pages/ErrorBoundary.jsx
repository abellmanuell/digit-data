import { Link, useRouteError } from "react-router-dom";
import { cn } from "../utils/cn";

function ErrorBoundary() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className={cn("grid grid-cols-2 grid-rows-3", "h-dvh", "p-4")}>
      <div
        className={cn(
          "col-start-1 col-end-3 row-start-2 place-self-center",
          "text-center"
        )}
      >
        <h1 className="font-bold">Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p className="text-pink-500">
          <i>
            {error.statusText || error.messageg} {error.data}
          </i>
        </p>

        <div className="mt-5 underline text-sm">
          <Link to="..">Go Back</Link>
        </div>
      </div>
    </div>
  );
}

export default ErrorBoundary;
