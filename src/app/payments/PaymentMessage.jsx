import Heading from "@/components/Heading";
import LinkTo from "@/components/LinkTo";
import Paragraphing from "@/components/Paragraphing";
import Wrapper from "@/components/Wrapper";
import { CircleCheck, CircleX } from "lucide-react";
import { useSearchParams } from "react-router-dom";

export default function PaymentMessage() {
  const [searchParams] = useSearchParams();
  const status = searchParams.get("status");

  return (
    <Wrapper className="flex justify-center items-center flex-col p-20">
      {status !== "cancelled" || status !== "failed" ? (
        <CircleCheck size="50px" className="text-green-500" />
      ) : (
        <CircleX size="50px" className="text-red-500" />
      )}
      <div className="my-4 flex flex-col justify-center items-center">
        <Heading className="text-xl">
          {status !== "cancelled"
            ? "Payment successful 🎉"
            : status !== "failed"
            ? "Payment failed"
            : "Payment cancel"}
        </Heading>
        {status !== "cancelled" ? (
          <Paragraphing className="text-center">
            Your transaction is complete and you're all set! 🚀
          </Paragraphing>
        ) : (
          <Paragraphing className="text-center">
            Your payment has been {status !== "failed" ? "canceled" : "failed"}.{" "}
            <br /> No worries, you can try again anytime! 😊
          </Paragraphing>
        )}
      </div>
      <LinkTo className="text-sm underline" to="/dashboard">
        {status !== "cancelled" || status !== "failed"
          ? "Go Dashboard"
          : "Try again"}
      </LinkTo>
    </Wrapper>
  );
}
