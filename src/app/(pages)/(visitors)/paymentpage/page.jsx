import Basket from "@/app/components/global/Basket";
import Step from "@/app/components/kurator_create_edit/Step";
import PersonalForm from "@/app/components/paymentpage/PersonalForm";

export default function PaymentPage() {
  return (
    <main>
      <h1>PaymentPage</h1>
      <Step />
      <PersonalForm />
      <Basket />
    </main>
  );
}
