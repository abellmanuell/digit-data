import Heading from "@/components/Heading";
import Paragraphing from "@/components/Paragraphing";
import React from "react";
import handSomeMan from "../../assets/handsome-man.jpg";
import handSomeManAPI from "../../assets/f.jpg";
import ladySmilePhone from "../../assets/d.jpg";
import { cn } from "../../utils/cn";
import LinkTo from "@/components/LinkTo";
import ListItem from "@/components/ListItem";

export default function Features() {
  return (
    <section className="px-4 md:px-32 py-10 flex flex-col">
      <Heading className="text-center mb-10 text-xl">Features</Heading>

      <div className="sm:grid grid-cols-3 gap-2 space-y-5 sm:space-y-0">
        <div className="p-10 bg-neutral-50 rounded-lg">
          <div>
            <img
              src={ladySmilePhone}
              alt="Father Home"
              className="w-[500px] h-[200px] object-cover rounded-lg max-h-[400px]"
            />
          </div>

          <div>
            <Heading className="my-4 text-center lg:text-left">
              Become An Agent
            </Heading>

            <Paragraphing className="my-4 text-neutral-500">
              Join our network of outstanding entrepreneurs patnering with Digit
              Data. Bring the Digit Data 'easy-payments' experience closer to
              your network and earn a commission for every transaction you
              perform for your customers. We offer our Referrers the best
              referral program incentives to encourage entrepreneurial and
              managerial skill acquisition; enhance growth and development and
              general empowerment among our students on campuses of higher
              learning and youths in diaspora. Finally, to promote technology
              via the use of ICT tools in our society.
            </Paragraphing>
          </div>
        </div>

        <div className="p-10 bg-neutral-50 rounded-lg">
          <div>
            <img
              src={handSomeMan}
              alt="Father Home"
              className="w-[500px] h-[200px] object-cover rounded-lg"
            />
          </div>

          <div>
            <Heading className="my-4 text-center lg:text-left">
              We Provide Awesome Services
            </Heading>

            <Paragraphing className="my-4 text-neutral-500">
              Certain things are hard; making payments shouldn't be one of them.
              DIGITAL TECH helps you make payments for services you enjoy right
              from the comfort of your home or office. The experience of total
              convenience,fast service delivery and easy payment is just at your
              fingertips Our major aim is to provide affordable and legit
              services(Data, Cable subscription, Airtime e.t.c) for our partners
              at large In assurance to give you the best treat, all our services
              and transactions are running on an automated system. Without any
              delay in delivery.
            </Paragraphing>
          </div>
        </div>

        <div className="p-10 bg-neutral-50 rounded-lg">
          <div>
            <img
              src={handSomeManAPI}
              alt="Father Home"
              className="w-[500px] h-[200px] object-cover rounded-lg"
            />
          </div>

          <div>
            <Heading className="my-4 text-center lg:text-left">
              Integrate our API
            </Heading>

            <Paragraphing className="my-4 text-neutral-500">
              Are you a developer, Integrate our well-documented API that lets
              you earn from serving hundreds of thousands of customers.However
              huge or complex your imagination, you can build it with Digit Data
              API.
            </Paragraphing>

            <ul>
              <ListItem>
                <LinkTo
                  className={cn(
                    "bg-tw-blue-700 text-white ",
                    "font-bold py-4 text-sm rounded-full",
                    "flex items-center justify-center"
                  )}
                  to="/"
                  name="View Documentation"
                />
              </ListItem>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
