import StatementCard from "@/components/StatementCard";
import HeaderLandingPage from "./HeaderLandingPage";
import HeroSection from "./HeroSection";
import Statement from "./Statement";

import {
  ArrowTrendingUpIcon,
  EyeIcon,
  LightBulbIcon,
} from "@heroicons/react/24/solid";
import IconButton from "../../components/IconButton";
import Paragraphing from "../../components//Paragraphing";
import Heading from "@/components/Heading";
import About from "./About";
import WhyIs from "./WhyIs";
import Features from "./Features";
import Plans from "./Plans";
import Services from "./Services";

export default function LandingPage() {
  return (
    <div>
      <HeaderLandingPage />
      <HeroSection />

      <section className="px-4 md:px-32 py-10  md:flex flex-col items-center justify-center lg:h-svh">
        <Heading className="text-center text-xl">Overview</Heading>
        <Paragraphing className="text-center text-gray-400">
          Our mission and vision of digit data
        </Paragraphing>

        <Statement className="lg:grid grid-cols-3">
          <StatementCard>
            <div className="m-5 bg-emerald-100 text-emerald-500 p-10 rounded-lg">
              <div className="w-16 h-16 flex items-center justify-center bg-emerald-50 p-4 mx-auto rounded-full my-5">
                <IconButton Icon={LightBulbIcon} />
              </div>

              <Paragraphing className="text-center">
                We are committed to growing wider with efficiency and adequacy
                to make the world of technology easier for our partners and
                customers through competency and sure blend of quality services.
                Like they say "DATA IS LIFE!".
              </Paragraphing>
            </div>
          </StatementCard>

          <StatementCard>
            <div className="m-5 bg-pink-100 text-pink-500 p-10 rounded-lg">
              <div className="w-16 h-16 flex items-center justify-center bg-pink-50 p-4 mx-auto rounded-full my-5">
                <IconButton Icon={EyeIcon} />
              </div>

              <Paragraphing className="text-center">
                Our mission is to ensure that our partners and customers are
                satisfied in all ramfications and also to ensure that we grow
                together in this venture.
              </Paragraphing>
            </div>
          </StatementCard>

          <StatementCard>
            <div className="m-5 bg-orange-100 text-orange-500 p-10 rounded-lg">
              <div className="w-16 h-16 flex items-center justify-center bg-orange-50 p-4 mx-auto rounded-full my-5">
                <IconButton Icon={ArrowTrendingUpIcon} />
              </div>

              <Paragraphing className="text-center">
                We use innovative technology to run our services. Our data
                delivery and wallet funding is automated, airtime top-up and
                data purchase are automated and get delivered to you within a
                spilt second of time.
              </Paragraphing>
            </div>
          </StatementCard>
        </Statement>
      </section>

      <About />
      <WhyIs />
      <Features />
      <Plans />
      <Services />
    </div>
  );
}
