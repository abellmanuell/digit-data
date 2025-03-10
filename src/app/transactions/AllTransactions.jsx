import React, { useContext, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/components/ui/table";
import Wrapper from "@/components/Wrapper";
import { TokenContext, UserContext } from "../../contexts/context";
import { HistoryIcon } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import transactionsServices from "../../services/transactions.service";
import Heading from "@/components/Heading";
import { Input } from "@/components/components/ui/input";

export default function Transactions() {
  const [isLoadingTable, setIsLoadingTable] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const { user, setUser } = useContext(UserContext);
  const { token, setToken } = useContext(TokenContext);
  const [searchWord, setSearchWord] = useState("");

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

  const filteredTransactions = transactions.filter(
    (transaction) =>
      transaction.mobile_number
        .toLowerCase()
        .includes(searchWord.toLowerCase()) ||
      transaction.ident.toLowerCase().includes(searchWord.toLowerCase()) ||
      transaction.amount.toLowerCase().includes(searchWord.toLowerCase())
  );

  React.useEffect(() => {
    loadTransactions();
    user && setIsLoadingTable(true);
  }, []);

  return (
    <Wrapper>
      <Toaster position="top-left" reverseOrder={true} />

      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-center">
          <Heading className="my-10 grow">All Transactions</Heading>
          <Input
            placeholder="Search transactions"
            onChange={(e) => setSearchWord(e.target.value)}
            className="w-full sm:w-[200px]"
          />
        </div>

        {/* Transactions Histroy Table */}
        <section className="border border-gray-100 rounded-md mt-4">
          {transactions.length ? (
            !isLoadingTable ? (
              <>
                <div className="flex justify-center items-center h-screen">
                  <ClipLoader color="#000" size={100} />
                </div>
              </>
            ) : (
              <Table>
                <TableCaption>A list of your recent transactions.</TableCaption>
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
                  {filteredTransactions.map((transaction, index) => {
                    const {
                      ident,
                      create_date,
                      Status,
                      mobile_number,
                      amount,
                    } = transaction;
                    return (
                      <TableRow key={transaction._id}>
                        <TableCell className="font-medium">{ident}</TableCell>
                        <TableCell>{mobile_number}</TableCell>
                        <TableCell className="text-right">₦{amount}</TableCell>
                        <TableCell>{create_date}</TableCell>
                        <TableCell>{Status}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
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
  );
}
