import OpacityBoxSingleview from "@/components/eventView/OpacityBoxSingleview";
import Button from "@/components/global/CustomButton";
import { getSMK, getEventId } from "@/lib/api";

export default async function EventView({ params }) {
  const { id } = await params;
  const dataeventid = await getEventId(id);
  const SMKItems = await getSMK();

  const data = dataeventid.artworkIds.map((artwork) => {
    const result = SMKItems.find((SMKitem) => SMKitem.object_number == artwork);
    return result;
  });

  console.log("SMK data iforholdet til sitets event id: ", data);

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
