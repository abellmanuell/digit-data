import AlertDialog from "@/components/AlertDialog";
import FieldInfo from "@/components/FieldInfo";
import FormInput from "@/components/FormInput";
import FormSelect from "@/components/FormSelect";
import Heading from "@/components/Heading";
import SubmitButton from "@/components/SubmitButton";
import { useForm } from "@tanstack/react-form";
import fetcher from "../../hooks/useFetch";
import React, { useContext, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import { TokenContext, UserContext } from "../../contexts/context";
import topUpServices from "../../services/topup.service";
import { FileClock, FolderClock, History, Wallet } from "lucide-react";
import { Link } from "react-router-dom";
import Transactions from "@/components/Transactions";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [buyAirtime, setBuyAirtime] = useState(null);
  const [networks, setNetworks] = useState([]);
  const [airtimeType, setAirtimeType] = useState([]);
  const { token, setToken } = useContext(TokenContext);
  const { user, setUser } = useContext(UserContext);

  async function loadNetworkAndAirtimeType() {
    try {
      const networks = await fetcher.get("/api/networks");
      const airtimeType = await fetcher.get("/api/airtime-type");
      if (networks.status >= 200 && networks.status < 299) {
        setNetworks(networks.data);
        if (airtimeType.status >= 200 && airtimeType.status < 299) {
          setAirtimeType(airtimeType.data);
          setIsLoading(true);
        }
      } else {
        toast.error("Unexpected error occurred!");
      }
    } catch {
      throw new Error();
    }
  }

  React.useEffect(() => {
    loadNetworkAndAirtimeType();
  }, []);

  const form = useForm({
    defaultValues: {
      network: 0 || "",
      airtime_type: 0 || "",
      mobile_number: 0 || "",
      amount: 0 || "",
    },
    onSubmit: async ({ value }) => {
      setBuyAirtime(value);
    },
    validators: {
      onChange: ({ value }) => {
        return {
          fields: {
            network: !value.network ? "Network is required" : undefined,
            amount: !value.amount ? "Amount is required" : undefined,
            mobile_number: !value.mobile_number
              ? "Mobile Number is required"
              : undefined,

            airtime_type: !value.airtime_type
              ? "Airtime Type is required"
              : undefined,
          },
        };
      },
    },
  });

  return !isLoading ? (
    <div className="flex justify-center items-center h-screen">
      <ClipLoader color="#000" loading={isLoading} size={100} />
    </div>
  ) : (
    <div className="w-full">
      <Toaster position="top-left" reverseOrder={true} />

      <div className="my-10">
        <h3 className="text-2xl">
          Welcome <strong>{user.given_name}</strong>!
        </h3>
      </div>

      <div>
        <div className="bg-orange-100 max-w-[300px] rounded-md p-5 my-5 flex items-center space-x-5">
          <div>
            <Wallet size={30} className="text-gray-500" />
          </div>
          <div>
            <h3 className="font-bold">Wallet Balance</h3>
            <div className="my-2">
              <h1 className="text-2xl font-bold">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "NGN",
                }).format(user.wallet_balance)}
              </h1>
              <p className="text-sm text-gray-500">Nigerian Currency</p>
            </div>
          </div>
        </div>

        <div>
          <Link
            to="fund_wallet"
            className="bg-black text-white rounded-md font-bold px-6 py-4"
          >
            Add Fund
          </Link>
        </div>
      </div>

      <div className="my-20">
        <p className="text-sm">History</p>
        <div className=" grid sm:grid-cols-2 md:grid-cols-3">
          <Transactions
            name="All Transactions"
            href="/all_transactions"
            className="bg-black text-white"
          >
            <History size={30} />
          </Transactions>

          <Transactions
            name="Airtime Transactions"
            href="/airtime_transactions"
            className="bg-gray-100 hover:bg-gray-200"
          >
            <FileClock size={30} />
          </Transactions>

          <Transactions
            name="Data Transactions"
            href="/data_transactions"
            className="bg-gray-100 hover:bg-gray-200"
          >
            <FolderClock size={30} />
          </Transactions>
        </div>
      </div>
    </div>
  );
}
