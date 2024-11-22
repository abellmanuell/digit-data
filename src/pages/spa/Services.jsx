import Heading from "@/components/Heading";
import Paragraphing from "@/components/Paragraphing";
import {
  ArrowPathRoundedSquareIcon,
  CalculatorIcon,
  CogIcon,
  WalletIcon,
} from "@heroicons/react/24/solid";
import React from "react";

export default function Services() {
  return (
    <section className="px-4 md:px-32 py-10">
      <Heading className="text-center mb-10 text-xl">Our Services</Heading>

      <div className="grid gap-4 lg:grid-cols-2 s">
        <Different icon={CogIcon} title="Buy Data">
          Start enjoying this very low rates Data plan for your internet
          browsing databundle.
        </Different>

        <Different icon={ArrowPathRoundedSquareIcon} title="Airtime To Cash">
          We offer this service at a very good attractive rate please login to
          get current conversion rate..
        </Different>

        <Different icon={CalculatorIcon} title="Utility Payment">
          Because we understand your needs, we have made bills and utilities
          payment more convenient.
        </Different>

        <Different icon={WalletIcon} title="Cable Subscription">
          Instantly Activate Cable subscription with favourable discount compare
          to others
        </Different>

        <Different icon={WalletIcon} title="Airtime Top Up">
          Making an online recharge has become very easy and safe on Digit Data
        </Different>

        <Different icon={WalletIcon} title="Bulk SMS">
          Send BulkSMS to any number for as low as just 2.5kobo per unit.
        </Different>
      </div>
    </section>
  );
}

function Different({ title, icon: Icon, children }) {
  return (
    <div className="flex flex-col">
      <div className="py-5">
        <Icon className="w-10" />
      </div>
      <div>
        <Heading>{title}</Heading>
        <Paragraphing className="text-neutral-500">{children}</Paragraphing>
      </div>
    </div>
  );
}
