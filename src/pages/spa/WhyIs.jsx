import Heading from "@/components/Heading";
import IconButton from "@/components/IconButton";
import Paragraphing from "@/components/Paragraphing";
import {
  ArrowPathRoundedSquareIcon,
  CalculatorIcon,
  CogIcon,
  WalletIcon,
} from "@heroicons/react/24/solid";

export default function WhyIs() {
  return (
    <section className="px-4 md:px-32 py-10">
      <Heading className="text-center mb-10 text-xl">
        Why Is Digit Data Different?
      </Heading>

      <div className="grid gap-4 lg:grid-cols-2 s">
        <Different icon={CogIcon} title="We Are Automated">
          We use cutting-edge technology to run our services. Our delivery and
          wallet funding is automated, any service purchased will get delivered
          to you instantly.
        </Different>

        <Different icon={ArrowPathRoundedSquareIcon} title="We are Reliable">
          Digital Data is a fully optimized platform for reliability and
          dependability. You get 100% value for any transaction you carry with
          us.
        </Different>

        <Different icon={CalculatorIcon} title="Customer Support">
          Our customer service is just a click away, don't hesitate to consult
          us on anything as the system is 90% automated. Thus, all transactions
          are attended to within 5-15mins.
        </Different>

        <Different icon={WalletIcon} title="We are 100% secure">
          Your e-wallet is the safest, easiest and fastest means of carrying out
          transactions with us. Your funds are secured with your e-wallet PIN
          and can be kept for you for as long as you want. You can also withdraw
          it any time.
        </Different>
      </div>
    </section>
  );
}

function Different({ title, icon: Icon, children }) {
  return (
    <div className="flex items-center p-5">
      <div className="px-5">
        <Icon className="w-10" />
      </div>
      <div>
        <Heading>{title}</Heading>
        <Paragraphing className="text-neutral-500">{children}</Paragraphing>
      </div>
    </div>
  );
}
