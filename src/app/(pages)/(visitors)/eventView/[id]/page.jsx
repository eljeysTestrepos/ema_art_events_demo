import Button from "@/components/global/Button";
import OpacityTextBox from "@/components/global/OpacityTextBox";
import { getEventId } from "@/lib/api";
import { use } from "react";

export default async function EventView({ params }) {
  const { id } = await params;
  // const dataEventsid = await getEventId(id);

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
