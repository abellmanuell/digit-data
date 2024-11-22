import { cn } from "../../utils/cn";
import smilingLady from "../../assets/happy-model-blowing-kiss.png";
// import africanAmerican from "../../assets/african-american.png";
import Paragraphing from "@/components/Paragraphing";
import ListItem from "@/components/ListItem";
import LinkTo from "@/components/LinkTo";
import {
  CursorArrowRippleIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import IconButton from "@/components/IconButton";

import Slider from "react-slick/lib/slider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HeroSection = () => {
  let sliderSetting = {
    arrows: false,
    autoplay: true,
  };

  return (
    <main
      className={cn(
        "pt-20 px-4 md:px-32",
        "lg:flex items-end",
        "bg-tw-blue-700"
      )}
    >
      <div className="lg:grid grid-cols-2">
        <div className="self-center">
          <section className="">
            <h1 className="text-white font-bold text-4xl mb-2">
              <span className="text-amber-400">Buy affordable Airtime</span>{" "}
              <br />
              Mobile Data, Utility bills, Cable subscription and
              <br />
              others.
            </h1>

            <Paragraphing className="text-tw-blue-200 py-2">
              We offer you the most affordable and most cheapest data, airtime,
              Dstv, Gotv and Startimes subscription. Here is the right place for
              your Electricity Bill payment, subscriptions and also Convert your
              Airtime to Cash.
            </Paragraphing>
          </section>

          <ul
            className={cn(
              "md:flex md:space-y-0 md:space-x-4 md:justify-start",
              " my-4 space-y-2  justify-center"
            )}
          >
            <ListItem>
              <LinkTo
                className={cn(
                  "bg-black text-white ",
                  "font-bold py-4 px-10 text-sm rounded-full space-x-2 ",
                  "flex items-center justify-center"
                )}
                to="/login"
                name="Get Started"
              >
                <IconButton Icon={CursorArrowRippleIcon} />
              </LinkTo>
            </ListItem>
            <ListItem>
              <LinkTo
                className={cn(
                  "bg-white ",
                  "font-bold py-4 px-10 text-sm rounded-full ",
                  "flex items-center justify-center space-x-2"
                )}
                to="/"
                name="Discover"
              >
                <IconButton Icon={MagnifyingGlassIcon} />
              </LinkTo>
            </ListItem>
          </ul>
        </div>

        <div className="overflow-hidden">
          <Slider {...sliderSetting}>
            <div>
              <img
                src={smilingLady}
                alt="Smiling Lady"
                className="relative top-10"
              />
            </div>
            <div className="relative">
              <img
                src={smilingLady}
                alt="Smiling Lady"
                className="relative top-10"
              />
            </div>
          </Slider>
        </div>
      </div>
    </main>
  );
};

export default HeroSection;
