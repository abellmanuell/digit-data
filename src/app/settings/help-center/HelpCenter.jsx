import Heading from "@/components/Heading";
import LinkTo from "@/components/LinkTo";
import Paragraphing from "@/components/Paragraphing";
import Wrapper from "@/components/Wrapper";
import { Mail, Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function HelpCenter() {
  return (
    <Wrapper>
      <div className="mt-4 mb-10">
        <Heading className="mt-4 mb-2">Help Center</Heading>
        <Paragraphing className="text-gray-500">
          Find answers, get support, and resolve issues quickly.
        </Paragraphing>
      </div>

      <LinkTo
        to="https://wa.me/+2349025534431"
        className="hover:bg-gray-50 block py-4"
      >
        <div className="flex items-center">
          <div className="px-10">
            <FaWhatsapp />
          </div>
          <div>
            <h2 className="text-sm font-medium">Whatsapp Message</h2>
            <Paragraphing className="text-gray-500">
              Send Message on Whatsapp
            </Paragraphing>
          </div>
        </div>
      </LinkTo>

      <LinkTo to="tel:+2349025534431" className="hover:bg-gray-50 block py-4">
        <div className="flex items-center">
          <div className="px-10">
            <Phone size="16px" />
          </div>
          <div>
            <h2 className="text-sm font-medium">Phone Call</h2>
            <Paragraphing className="text-gray-500">
              Mobile phone call also a option for you.
            </Paragraphing>
          </div>
        </div>
      </LinkTo>

      <LinkTo
        to="mailto:mannydev02@gmail.com"
        className="hover:bg-gray-50 block py-4"
      >
        <div className="flex items-center">
          <div className="px-10">
            <Mail size="16px" />
          </div>
          <div>
            <h2 className="text-sm font-medium">Email Me</h2>
            <Paragraphing className="text-gray-500">
              Email messaging is also a great option for you.
            </Paragraphing>
          </div>
        </div>
      </LinkTo>

      <LinkTo
        to="https://x.com/abellmanuelll"
        className="hover:bg-gray-50 block py-4"
      >
        <div className="flex items-center">
          <div className="px-10">
            <FaXTwitter size="16px" />
          </div>
          <div>
            <h2 className="text-sm font-medium">X/Twitter</h2>
            <Paragraphing className="text-gray-500">
              Messaging platform you can reach out.
            </Paragraphing>
          </div>
        </div>
      </LinkTo>
    </Wrapper>
  );
}
