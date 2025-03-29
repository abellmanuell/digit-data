import Heading from "@/components/Heading";
import LinkTo from "@/components/LinkTo";
import Paragraphing from "@/components/Paragraphing";
import Wrapper from "@/components/Wrapper";
import { Info, KeyRound, LogOut, User2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Settings() {
  const navigate = useNavigate();

  function logout() {
    localStorage.clear();
    navigate("/signin");
  }

  return (
    <Wrapper>
      <div>
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
      </div>

      <div>
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
      </div>

      <div className="my-10">
        <button
          className="text-red-500 hover:bg-red-500/5 hover:text-red-500 w-full px-2 py-1 rounded text-left flex items-center space-x-2"
          onClick={logout}
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </Wrapper>
  );
}
