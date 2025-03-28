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
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/components/ui/table";
import transactionsServices from "../../services/transactions.service";
import Wrapper from "@/components/Wrapper";
import AddFundDialog from "@/components/FundAccountDialog";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingTable, setIsLoadingTable] = useState(false);
  const { token, setToken } = useContext(TokenContext);
  const { user, setUser } = useContext(UserContext);
  const [transactions, setTransactions] = useState([]);

  async function loadTransactions() {
    try {
      const transactions = await transactionsServices.getTransactions(
        {
          _id: user._id,
        },
        token
      );
      setTransactions(transactions.data);
      setIsLoadingTable(true);
    } catch {
      toast.error("Unexpected error occurred loading table!");
      throw new Error("Unexpected error occurred loading table!");
    }
  }

  React.useEffect(() => {
    loadTransactions();
    user && setIsLoading(true);
  }, []);

  return !isLoading ? (
    <div className="flex justify-center items-center h-screen">
      <ClipLoader color="#000" size={100} />
    </div>
  ) : (
    <>
      {/* <div className="bg-orange-100 text-orange-500 p-2 w-full text-center text-sm">
        <strong>Notice: </strong>
        The ₦100 bonus will be deactivated once we have 5 users in our system.
      </div> */}
      <Wrapper>
        <Toaster position="top-left" reverseOrder={true} />

        {/* Welcome user */}
        <div className="my-5">
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
                  ₦{new Intl.NumberFormat("en-US").format(user.wallet_balance)}
                </h1>
                <p className="text-sm text-gray-500">Nigerian Currency</p>
              </div>
            </div>
          </div>

          <div>
            <AddFundDialog />
          </div>
        </div>

        {/* Shortcurt action btn */}
        <ListActionsButton />

        <div className="mb-10">
          <p className="text-sm font-bold">History</p>
          <div className="gap-x-4 grid sm:grid-cols-2 md:grid-cols-3">
            <Transactions
              name="All Transactions"
              href={"transactions/" + user._id}
              className="bg-black text-white"
            >
              <History size={30} />
            </Transactions>

            <Transactions
              name="Airtime Transactions"
              href={"airtime_transactions/" + user._id}
              className="bg-gray-100 hover:bg-gray-200"
            >
              <FileClock size={30} />
            </Transactions>

            <Transactions
              name="Data Transactions"
              // href="/data_transactions"
              className="bg-gray-100 hover:bg-gray-200 opacity-70 cursor-not-allowed"
            >
              <FolderClock size={30} />
            </Transactions>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold">Recent Transactions</p>
            <Link
              to={"transactions/" + user._id}
              className="text-sm hover:font-medium transition-all"
              justify-between
            >
              See More
            </Link>
          </div>

          {/* Transactions Histroy Table */}
          <section className="border border-gray-100 rounded-md mt-4">
            {transactions.length ? (
              !isLoadingTable ? (
                <>
                  <div className="flex justify-center items-center h-screen">
                    <ClipLoader
                      color="#000"
                      loading={isLoadingTable}
                      size={100}
                    />
                  </div>
                </>
              ) : (
                <div>
                  <Table>
                    <TableCaption>
                      A list of your recent transactions.
                    </TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">
                          Transaction Reference
                        </TableHead>
                        <TableHead>Phone Number</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {transactions.slice(0, 5).map((transaction, index) => {
                        const {
                          ident,
                          create_date,
                          Status,
                          mobile_number,
                          amount,
                        } = transaction;
                        return (
                          <TableRow key={transaction._id}>
                            <TableCell className="font-medium">
                              {ident}
                            </TableCell>
                            <TableCell>{mobile_number}</TableCell>
                            <TableCell className="text-right">
                              ₦{amount}
                            </TableCell>
                            <TableCell>{create_date}</TableCell>
                            <TableCell>{Status}</TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              )
            ) : (
              <div className="h-52 w-full flex flex-col space-y-2 items-center justify-center">
                <HistoryIcon className="text-gray-700" />
                <p className="text-sm text-gray-500">No Transactions</p>
              </div>
            )}
          </section>
        </div>
      </Wrapper>
    </>
  );
}

/* Shortcut Links */
const ListActionsButton = () => {
  const actions = [
    {
      name: "Buy Airtime",
      url: "buyairtime",
      Icon: Phone,
    },
    { name: "Buy Data", url: "buydata", Icon: Signal },
  ];

  return (
    <div className="mt-10 mb-10">
      <div className=" grid grid-cols-3 sm:grid-cols-5 md:grid-cols-4 lg:grid-cols-8 gap-2">
        {actions.map(({ name, url, Icon, flag }) => {
          return (
            <Link
              key={name}
              to={url}
              className="p-4 border hover:border-gray-100 flex flex-col relative items-center space-y-2 rounded-md group text-gray-800"
            >
              {flag && (
                <div className="text-xs absolute -top-2 -right-4 bg-red-500 text-white rounded-full p-1">
                  {flag}
                </div>
              )}
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
