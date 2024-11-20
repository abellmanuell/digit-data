import { cn } from "../../utils/cn";
import smilingLady from "../../assets/happy-model-blowing-kiss.png";
import Paragraphing from "@/components/Paragraphing";
import ListItem from "@/components/ListItem";
import { Link } from "react-router-dom";
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
    // dots: true,
    arrows: false,
    autoplay: true,
  };

  return (
    <main
      className={cn(
        "pt-10 px-4 md:px-32",
        "flex items-end",
        "bg-tw-blue-700 overflow-hidden h-dvh"
      )}
    >
      <div className="lg:grid grid-cols-2">
        <div className="self-center">
          <section className="">
            <h1 className="text-white font-bold text-4xl mb-2">
              <span className="text-yellow-400">Buy affordable Airtime</span>{" "}
              <br />
              Mobile Data, Utility bills, Cable subscription and
              <br />
              others.
            </h1>

            <Paragraphing className="text-white">
              We offer you the most affordable and most cheapest data, airtime,
              Dstv, Gotv and Startimes subscription. Here is the right place for
              your Electricity Bill payment, subscriptions and also Convert your
              Airtime to Cash.
            </Paragraphing>
          </section>

          <ul className="flex my-4 space-x-4 justify-center lg:justify-start">
            <ListItem
              className={cn(
                "bg-black text-white ",
                "font-bold py-4 px-10 rounded-full space-x-2 ",
                "flex items-center"
              )}
            >
              <LinkTo to="/login" name="Get Started" />
              <IconButton Icon={CursorArrowRippleIcon} />
            </ListItem>
            <ListItem className="bg-white font-bold py-4 px-6 rounded-full space-x-2 flex items-center">
              <LinkTo to="/" name="Discover" />
              <IconButton Icon={MagnifyingGlassIcon} />
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
            </div>{" "}
          </Slider>
        </div>
      </div>
    </main>
  );
};

export default HeroSection;
