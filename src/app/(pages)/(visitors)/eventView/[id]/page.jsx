import OpacityBoxSingleview from "@/components/eventView/OpacityBoxSingleview";
import Button from "@/components/global/CustomButton";
import { getEventId } from "@/lib/api";
import { use } from "react";

export default async function EventView({ params }) {
  const { id } = await params;
  const dataEventsid = await getEventId(id);

  return (
    <main>
      <h1>EventView {id}</h1>
      <section>
        <OpacityBoxSingleview
          title={`${dataEventsid.title}`}
          content={`${dataEventsid.description}`}
        />
        <Button />
      </section>
      <section></section>
    </main>
  );
}
