import Button from "@/components/global/Button";
import OpacityTextBox from "@/components/global/OpacityTextBox";
import { getSMK } from "@/lib/api";

export default async function EventView({ params }) {
  const { id } = await params;
  // const dataEventsid = await getEventId(id);
  const data = await getSMK();
  console.log(data);

  return (
    <main>
      <h1>EventView {id}</h1>
      <section>
        <OpacityTextBox />
        <Button />
      </section>
      <section></section>
    </main>
  );
}
