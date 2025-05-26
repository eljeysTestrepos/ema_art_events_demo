import Basket from "@/components/global/Basket";
import Step from "@/components/kurator_create_edit/Step";
import PersonalForm from "@/components/paymentpage/PersonalForm";

export default function PaymentPage() {
  return (
    <main className="">
      <Step number="1" text="Dine informationer" className="" />
      <PersonalForm className="" />
    </main>
  );
}
