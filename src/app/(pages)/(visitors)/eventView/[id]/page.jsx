import Button from "@/app/components/global/Button";
import OpacityTextBox from "@/app/components/global/OpacityTextBox";
import { getEventId } from "@/app/lib/api";
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
