import Image from "next/image";
import Placeholder from "@/app/assets/img/placeholder.png";

import EventItemText from "./EventItemText";
import { getArtworkByEventID } from "@/lib/api";

const EventItem = async (dataevent) => {
  let objectNumber = dataevent.artworkIds[0];
  const artImg = await getArtworkByEventID(objectNumber);
  // console.log(
  //   "eventItem: ",
  //   "dataevent.artworkIds: ",
  //   dataevent.artworkIds[0],
  //   "objectNumber",
  //   objectNumber,
  //   "artImg: ",
  //   artImg.image_thumbnail
  // );

  return (
    <article className="grid grid-cols-1 p-6 md:grid-cols-[auto_1fr] md:gap-6 md:flex-row">
      <figure className="max-w-[250px] mb-(--space-3rem) md:mb-(--space-2rem) grid grid-rows-1 md:flex-shrink-0">
        <div
          className={`w-[200px] h-[250px] rounded-xl row-start-1 col-start-1`}
          style={{ backgroundColor: `${artImg.suggested_bg_color}` }}
        ></div>
        <Image
          src={artImg.image_thumbnail}
          alt="noget"
          width={500}
          height={500}
          className="block w-[200px] h-[250px] z-2 rounded-xl row-start-1 col-start-1"
          style={{ objectFit: "cover", transform: "translate(25px, 25px)" }}
        />
      </figure>
      <EventItemText {...dataevent} />
    </article>
  );
};

export default EventItem;
