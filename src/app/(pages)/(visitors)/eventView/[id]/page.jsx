import Button from "@/components/global/CustomButton";
import OpacityTextBox from "@/components/global/OpacityTextBox";
import { getSMK, getEventId } from "@/lib/api";
import { Image } from "lucide-react";

export default async function EventView({ params }) {
  const { id } = await params;
  const dataeventid = await getEventId(id);
  const SMKItems = await getSMK();

  {
    /* Hvis Event id har object_number så skal den finde object_number i SMK og spytte image ud  */
  }
  {
    /* {if (dataevent.) {
        }} */
  }

  console.log(
    "SingleView page: ",
    "SMKData: ",
    SMKItems,
    "dataeventid: ",
    dataeventid
  );

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
