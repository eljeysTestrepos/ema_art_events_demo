import OpacityTextBox from "@/components/global/OpacityTextBox";
import CustomButton from "@/components/global/CustomButton";
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

  const firstArtwork = data.length > 0 ? data[0] : null;

  return (
    <div
      className="event-view-background relative w-full h-screen overflow-hidden flex flex-col justify-start items-start"
      style={{
        backgroundImage: firstArtwork
          ? `url(${firstArtwork.image_thumbnail})`
          : "none",
        backgroundColor: firstArtwork
          ? firstArtwork.suggested_bg_color[0]
          : "#f0f0f0",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <main className="z-20 w-full h-full p-6">
        <section className="mt-8">
          <OpacityTextBox
            title={`${dataeventid.title}`}
            content={`${dataeventid.description}`}
            className="border-2 border-white rounded-lg p-4 max-w-lg"
          />
          <CustomButton className="mt-4" text="Tilmeld" />
        </section>
        <section></section>
      </main>
    </div>
  );
}
