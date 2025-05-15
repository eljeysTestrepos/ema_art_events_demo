import Button from "@/components/global/Button";
import OpacityTextBox from "@/components/global/OpacityTextBox";
import { getSMK, getEventId } from "@/lib/api";

export default async function EventView({ params }) {
  const { id } = await params;
  const dataeventid = await getEventId(id);
  const data = await getSMK();
  console.log("Hvad er her under Single Page? (dataeventid)" + dataeventid);

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
