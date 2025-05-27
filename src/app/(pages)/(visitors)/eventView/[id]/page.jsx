import OpacityTextBox from "@/components/global/OpacityTextBox";
import CustomButton from "@/components/global/CustomButton";
import Gallery from "@/components/EventView/Gallery";
import { getEventId, getArtworkByEventID } from "@/lib/api";
import Placeholder from "@/app/assets/img/placeholder.png";

export default async function EventView({ params, searchParams }) {
  const { id } = params;
  const { backgroundArtworkId } = searchParams;

  const dataeventid = await getEventId(id);

  let allArtworkDetails = [];
  if (dataeventid.artworkIds && dataeventid.artworkIds.length > 0) {
    allArtworkDetails = await Promise.all(
      dataeventid.artworkIds.map(async (artworkId) => {
        const artwork = await getArtworkByEventID(artworkId);
        return {
          id: artworkId,
          thumbnail: artwork?.image_thumbnail || Placeholder.src,
          suggested_bg_color: artwork?.suggested_bg_color || ["#f0f0f0"],
          title: artwork?.titles?.[0]?.title || "Ukendt Titel",
        };
      })
    );
  }

  let currentArtworkForBackground = null;
  if (backgroundArtworkId) {
    currentArtworkForBackground = allArtworkDetails.find(
      (art) => art.id === backgroundArtworkId
    );
  }

  if (!currentArtworkForBackground && allArtworkDetails.length > 0) {
    currentArtworkForBackground = allArtworkDetails[0];
  }

  const opacityBoxTitle =
    currentArtworkForBackground?.title || dataeventid.title;

  const opacityBoxContent = dataeventid.description;

  return (
    <div
      className="event-view-background relative w-full h-screen overflow-hidden"
      style={{
        backgroundImage: currentArtworkForBackground?.thumbnail
          ? `url(${currentArtworkForBackground.thumbnail})`
          : "none",
        backgroundColor: currentArtworkForBackground?.suggested_bg_color
          ? currentArtworkForBackground.suggested_bg_color[0]
          : "#f0f0f0",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        transition:
          "background-image 0.5s ease-in-out, background-color 0.5s ease-in-out",
      }}
    >
      <main className="z-20 w-full h-full p-6 grid grid-cols-1 md:grid-cols-2 grid-rows-[1fr_1fr_auto] gap-4">
        <section className="col-start-1 row-start-2 h-full flex flex-col justify-end items-start">
          <OpacityTextBox
            title={opacityBoxTitle}
            content={opacityBoxContent}
            className="p-4 max-w-md mb-4"
          />
          <CustomButton
            className="mt-4"
            text="Tilmeld event"
            link="/paymentpage"
          />
        </section>

        <section className="col-start-1 md:col-start-2 row-start-3 justify-self-center md:justify-self-end self-end mb-4 mr-4">
          <Gallery galleryData={allArtworkDetails} />
        </section>
      </main>
    </div>
  );
}
