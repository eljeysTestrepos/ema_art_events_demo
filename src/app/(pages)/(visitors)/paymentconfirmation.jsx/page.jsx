import Button from "@/components/global/Button";

export default function PaymentConfirmation() {
  return (
    <main>
      <h1>PaymentConfirmation</h1>
      <section>
        <h2>Tak for din bestilling!</h2>
        <p>Bekræftelse tilsendt til din email.</p>
        <Button />
      </section>
      <aside>
        <h2>Kvittering</h2>
      </aside>
    </main>
  );
}
