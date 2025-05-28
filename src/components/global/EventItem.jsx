// components/global/EventItem.jsx
// Fjern "use client" hvis den var der, og fjern async
import Image from "next/image";
import Placeholder from "@/app/assets/img/placeholder.png";

import EventItemText from "./EventItemText";
// Fjern getArtworkByEventID import

// EventItem er IKKE længere async
const EventItem = (dataevent) => {
  // dataevent.artworkIds[0] og getArtworkByEventID er flyttet til serverkomponenten
  const artImg = dataevent.artImg; // Modtag artImg direkte som prop

  // Hvis du stadig skal bruge objectNumber af en eller anden grund:
  // let objectNumber = dataevent.artworkIds[0];

  return (
    <article className="grid grid-cols-2 p-6 md:grid-cols-[auto_1fr] md:gap-6 md:flex-row">
      <figure className="max-w-[250px] mb-6 grid grid-rows-1 md:flex-shrink-0">
        <div
          className={`w-[200px] h-[250px] rounded-xl row-start-1 col-start-1`}
          // Tjek om artImg eksisterer, før du tilgår dens properties
          style={{ backgroundColor: artImg?.suggested_bg_color || "#CCCCCC" }} // Tilføj en fallback farve
        ></div>
        <Image
          src={artImg?.image_thumbnail || Placeholder} // Brug Placeholder hvis image_thumbnail mangler
          alt="noget"
          width={500}
          height={500}
          className="block w-[200px] h-[250px] z-2 rounded-xl row-start-1 col-start-1"
          style={{ objectFit: "cover", transform: "translate(25px, 25px)" }}
        />
      </figure>
      {/* Sørg for at sende alle relevante props ned, EventItemText bruger muligvis andre props fra dataevent */}
      <EventItemText {...dataevent} />
    </article>
  );
};

export default EventItem;
