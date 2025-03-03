import fetcher from "../../hooks/useFetch";
import React, { useContext, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import { TokenContext, UserContext } from "../../contexts/context";

import {
  FileClock,
  FolderClock,
  History,
  HistoryIcon,
  Phone,
  Signal,
  Wallet,
} from "lucide-react";
import { Link } from "react-router-dom";
import Transactions from "@/components/Transactions";
import { Input } from "@/components/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/components/ui/table";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const { user, setUser } = useContext(UserContext);

  React.useEffect(() => {
    user && setIsLoading(true);
  }, []);

  const transactions = [].slice(0, 5);

  return !isLoading ? (
    <div className="flex justify-center items-center h-screen">
      <ClipLoader color="#000" loading={isLoading} size={100} />
    </div>
  ) : (
    <div className="w-full">
      <Toaster position="top-left" reverseOrder={true} />

      {/* Welcome user */}
      <div className="my-10">
        <h3 className="text-2xl">
          Welcome <strong>{user.given_name || user.email} 🎉</strong>!
        </h3>
        <p className="text-sm text-gray-500 mt-2">
          To your world of endless services is ready and waiting let’s make
          today amazing!"
        </p>
      </div>

      {/* Wallet Card */}
      <div className="md:flex items-center md:space-x-10">
        <div className="bg-orange-100/70 w-[300px] rounded-md p-5 my-5 flex items-center space-x-5">
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
            className="bg-black text-white rounded-md font-bold px-4 py-2 text-sm"
          >
            Add Fund
          </Link>
        </div>
      </div>

      <ListActionsButton />

      <div className="mb-10">
        <p className="text-sm font-bold">History</p>
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

      <div>
        <div className="flex items-center justify-center">
          <p className="text-sm grow font-bold">Recent Transactions</p>
          <Link
            to="/transactions"
            className="text-sm hover:font-medium transition-all"
          >
            See More
          </Link>
        </div>

        {/* Transactions Histroy Table */}
        <section className="border border-gray-100 rounded-md mt-4">
          {transactions.length ? (
            <Table>
              <TableCaption>A list of your recent transactions.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Transaction</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction, index) => {
                  return (
                    <TableRow key={transaction.invoice}>
                      <TableCell className="font-medium">INV001</TableCell>
                      <TableCell>Credit Card</TableCell>
                      <TableCell className="text-right">$250.00</TableCell>
                      <TableCell>Jul 25, 2025</TableCell>
                      <TableCell>Paid</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          ) : (
            <div className="h-52 w-full flex flex-col space-y-2 items-center justify-center">
              <HistoryIcon className="text-gray-700" />
              <p className="text-sm text-gray-500">No Transactions</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

/* Shortcut Links */
const ListActionsButton = () => {
  const actions = [
    { name: "Buy Airtime", url: "buyairtime", Icon: Phone },
    { name: "Buy Data", url: "#", Icon: Signal },
  ];

  return (
    <div className="mt-10 mb-10">
      <div className=" grid grid-cols-3 sm:grid-cols-5 md:grid-cols-8 gap-2">
        {actions.map(({ name, url, Icon }) => {
          return (
            <Link
              key={name}
              to={url}
              className="p-4 border hover:border-gray-100 flex flex-col items-center space-y-2 rounded-md group text-gray-800"
            >
              <span className="inline-block p-2  group-hover:bg-gray-200 rounded-md group-hover:text-gray-500 transition-all">
                <Icon size={20} />
              </span>
              <p className="text-sm text-center">{name}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
