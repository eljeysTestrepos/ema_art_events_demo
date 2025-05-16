import OpacityBoxSingleview from "@/components/eventView/OpacityBoxSingleview";
import Button from "@/components/global/CustomButton";
import { getSMK, getEventId } from "@/lib/api";

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
          title={`${dataeventid.title}`}
          content={`${dataeventid.description}`}
        />
        <Button />
      </section>
      <section></section>
    </main>
  );
}
