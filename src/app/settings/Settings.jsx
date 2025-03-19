import Heading from "@/components/Heading";
import LinkTo from "@/components/LinkTo";
import Paragraphing from "@/components/Paragraphing";
import Wrapper from "@/components/Wrapper";
import { Info, KeyRound, User2 } from "lucide-react";

export default function Settings() {
  return (
    <Wrapper>
      <Heading className="my-4">Settings & Privacy</Heading>
      <LinkTo to="edit" className="hover:bg-gray-50 block py-4 ">
        <div className="flex items-center">
          <div className="px-10">
            <User2 />
          </div>
          <div>
            <h2 className="text-sm font-medium">Account Information</h2>
            <Paragraphing className="text-gray-500">
              See your account information like your phone number and email
              address.
            </Paragraphing>
          </div>
        </div>
      </LinkTo>

      <LinkTo to="change-password" className="hover:bg-gray-50 block py-4">
        <div className="flex items-center">
          <div className="px-10">
            <KeyRound />
          </div>
          <div>
            <h2 className="text-sm font-medium">Change your password</h2>
            <Paragraphing className="text-gray-500">
              Change your password at anytime.
            </Paragraphing>
          </div>
        </div>
      </LinkTo>

      <Heading className="my-4">Help Center</Heading>
      <LinkTo to="../help-center" className="hover:bg-gray-50 block py-4 ">
        <div className="flex items-center">
          <div className="px-10">
            <Info />
          </div>
          <div>
            <h2 className="text-sm font-medium">Contact support team</h2>
            <Paragraphing className="text-gray-500">
              All your issues can be resolve by contacting support team
            </Paragraphing>
          </div>
        </div>
      </LinkTo>
    </Wrapper>
  );
}
