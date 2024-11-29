import React from "react";
import digitDataLogo from "../assets/logo.webp";

export default function AccountInOutHeader({ title, description }) {
  return (
    <div className="text-center">
      <img
        className="w-40 m-auto"
        src={digitDataLogo}
        alt="Digit Data Logo"
        loading="lazy"
        width="400"
        height="200"
      />
      <div className="py-4 space-y-2">
        <h1 className="text-lg">{title}</h1>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
}
