import Heading from "@/components/Heading";
import LinkTo from "@/components/LinkTo";
import ListItem from "@/components/ListItem";
import Paragraphing from "@/components/Paragraphing";
import { cn } from "../../utils/cn";

import mtn from "../../assets/network-providers/mtn-logo.jpg";
import airtel from "../../assets/network-providers/airtel-logo.jpg";
import glo from "../../assets/network-providers/glo-logo.jpeg";
import mobile9 from "../../assets/network-providers/9mobile-logo.jpg";

export default function Plans() {
  return (
    <section className="px-4 md:px-32 py-10 flex flex-col bg-tw-blue-700">
      <Heading className="text-center text-xl text-white mb-10">
        Plans & Prices
      </Heading>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2 items-start sm:space-y-0">
        <div className="p-5 rounded-md bg-yellow-50">
          <div>
            <img src={mtn} alt="MTN Logo" className="w-20 h-20 rounded-lg" />
          </div>

          <div>
            <Heading className="my-4 text-center lg:text-left">
              MTN Data
            </Heading>

            <Paragraphing className="my-4 text-neutral-500"></Paragraphing>
            <ul>
              <ListItem>
                <LinkTo
                  className={cn(
                    "bg-tw-blue-700 text-white ",
                    "font-bold py-4 text-sm rounded-full",
                    "flex items-center justify-center"
                  )}
                  to="/"
                  name="Shop Now"
                />
              </ListItem>
            </ul>
          </div>
        </div>

        <div className="p-5 rounded-md bg-red-50">
          <div>
            <img
              src={airtel}
              alt="Airtel Logo"
              className="w-20 h-20 rounded-lg"
            />
          </div>

          <div>
            <Heading className="my-4 text-center lg:text-left">
              Airtel Data
            </Heading>

            <Paragraphing className="my-4 text-neutral-500"></Paragraphing>
            <ul>
              <ListItem>
                <LinkTo
                  className={cn(
                    "bg-tw-blue-700 text-white ",
                    "font-bold py-4 text-sm rounded-full",
                    "flex items-center justify-center"
                  )}
                  to="/"
                  name="Shop Now"
                />
              </ListItem>
            </ul>
          </div>
        </div>

        <div className="p-5 rounded-md bg-neutral-50">
          <div>
            <img
              src={mobile9}
              alt="9 Mobile"
              className="w-20 h-20 rounded-lg"
            />
          </div>

          <div>
            <Heading className="my-4 text-center lg:text-left">
              9 Mobile Data
            </Heading>

            <Paragraphing className="my-4 text-neutral-500"></Paragraphing>

            <ul>
              <ListItem>
                <LinkTo
                  className={cn(
                    "bg-tw-blue-700 text-white ",
                    "font-bold py-4 text-sm rounded-full",
                    "flex items-center justify-center"
                  )}
                  to="/"
                  name="Shop Now"
                />
              </ListItem>
            </ul>
          </div>
        </div>

        <div className="p-5 rounded-md bg-green-50">
          <div>
            <img src={glo} alt="Glo" className="w-20 h-20 rounded-lg" />
          </div>

          <div>
            <Heading className="my-4 text-center lg:text-left">
              Glo Data
            </Heading>

            <Paragraphing className="my-4 text-neutral-500"></Paragraphing>

            <ul>
              <ListItem>
                <LinkTo
                  className={cn(
                    "bg-tw-blue-700 text-white ",
                    "font-bold py-4 text-sm rounded-full",
                    "flex items-center justify-center"
                  )}
                  to="/"
                  name="Shop Now"
                />
              </ListItem>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
