import Heading from "@/components/Heading";
import Paragraphing from "@/components/Paragraphing";
import React from "react";
import fatherHome from "../../assets/father-home.jpg";
import ListItem from "@/components/ListItem";
import LinkTo from "@/components/LinkTo";
import { cn } from "../../utils/cn";

export default function About() {
  return (
    <section className="px-4 md:px-32 py-10 h-svh bg-tw-blue-50 flex flex-col items-center justify-center">
      <div className="sm:grid grid-cols-2 gap-10 place-items-center space-y-5 sm:space-y-0">
        <div>
          <Heading className="my-4 text-center lg:text-left">About Us</Heading>

          <Paragraphing className="my-4 text-neutral-500">
            Digit Data is a web based platform where users can purchase Mobile
            Data Bundles, VTU Airtime, Pay Electricity Bills, Pay for TV
            Subscription. We have designed our website to accommodate user
            needs. Providing users of our platform the opportunity to save cost,
            make fast, secured, efficient and rewarding purchases and bill
            payments. Data can be rollover if you re-subscribe before expiry
            date of current plan.
          </Paragraphing>

          <ul>
            <ListItem>
              <LinkTo
                className={cn(
                  "bg-tw-blue-700 text-white ",
                  "font-bold py-4 text-sm rounded-full",
                  "flex items-center justify-center"
                )}
                to="/login"
                name="Register With Us Today"
              />
            </ListItem>
          </ul>
        </div>

        <div>
          <img
            src={fatherHome}
            alt="Father Home"
            className="w-[500px] rounded-lg"
          />
        </div>
      </div>
    </section>
  );
}
