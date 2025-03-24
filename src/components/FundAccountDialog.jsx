import { NumericFormat } from "react-number-format";
import { Button } from "./components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./components/ui/dialog";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { BeatLoader } from "react-spinners";
import { useContext, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import fundWalletServices from "../services/fund-wallet";
import { TokenContext, UserContext } from "../contexts/context";
import Paragraphing from "./Paragraphing";

export default function AddFundDialog() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [amount, setAmount] = useState("");
  const { token, setToken } = useContext(TokenContext);
  const { user, setUser } = useContext(UserContext);
  const [transactionFee, setTransactionFee] = useState(40);

  /* Make a request for payment callback */
  async function handleAccountFund() {
    try {
      setIsSubmitting(true);
      if (!Boolean(amount)) {
        setIsSubmitting(false);
        toast.error(
          "Oops! Looks like you forgot to enter something. Please fill in the field to continue! 😊"
        );

        return;
      }

      const paymentCallback = await fundWalletServices.fundWallet(
        {
          amount: amount.slice(1).split(",").join(""),
          transactionFee,
          ...user,
        },
        token
      );

      if (paymentCallback.status === 406) {
        setIsSubmitting(false);
        paymentCallback?.message.error.forEach((err) => {
          return toast.error(err?.msg);
        });
      }

      if (paymentCallback.status >= 200 && paymentCallback.status <= 299) {
        window.location.href = paymentCallback.message.data.link;
      }
    } catch {
      toast.error("Unexpected happened on attempt to fund wallet.");
      throw new Error("Unexpected happened on attempt to fund wallet");
    }
  }

  return (
    <Dialog>
      <Toaster position="top-left" reverseOrder={true} />

      <DialogTrigger className="bg-black text-white rounded-md font-bold px-4 py-2 text-sm">
        Add Fund
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Fund your account</DialogTitle>
          <DialogDescription>
            Easily add funds and keep your wallet ready for anything! 🚀💰
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 pt-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="amount" className="text-right">
              Amount
            </Label>
            <NumericFormat
              thousandSeparator=","
              prefix="₦"
              defaultValue={amount}
              onChange={(e) => setAmount(e.target.value)}
              id="amount"
              className="col-span-3"
              placeholder="Enter amount Min. ₦100"
              customInput={Input}
            />
          </div>
          <div className="flex justify-around">
            <Paragraphing className="">
              Transaction Fee: ₦{transactionFee}.00
            </Paragraphing>
            <Paragraphing className="">
              Total Charge:{" "}
              <b>
                {amount
                  ? `₦${Intl.NumberFormat().format(
                      parseInt(amount.slice(1).split(",").join("")) +
                        transactionFee
                    )}`
                  : "₦0"}
              </b>
            </Paragraphing>
          </div>
        </div>
        <DialogFooter>
          <Button
            disabled={isSubmitting}
            type="submit"
            onClick={handleAccountFund}
          >
            {isSubmitting ? (
              <BeatLoader color="#ffffff" size="5px" />
            ) : (
              "Continue"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
