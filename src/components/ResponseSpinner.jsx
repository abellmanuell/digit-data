import React from "react";
import { ClipLoader } from "react-spinners";

export default function ResponseSpinner({ spinner }) {
  return (
    <>
      {spinner.isResponseLoading && (
        <div className="bg-white fixed z-40 flex justify-center items-center p-2 rounded-full shadow-md top-2 transform -translate-x-1/2 translate-y-1/2 left-1/2">
          <ClipLoader color="#000" size={20} />
        </div>
      )}
    </>
  );
}
