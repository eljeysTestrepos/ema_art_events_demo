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
    <article className="grid grid-cols-1 grid-rows-auto @min-[475px]:grid-cols-2 @min-[475px]:grid-rows-1">
      <figure className="md:col-1 grid grid-cols-1 grid-rows-1">
        <div
          className={`h-[250px] w-full col-1 row-1 self-start justify-self-start`}
          style={{ backgroundColor: `${artImg.suggested_bg_color}` }}
        ></div>

        <Image
          src={artImg.image_thumbnail}
          alt="noget"
          width={500}
          height={500}
          className=" h-full w-full pl-6 pt-6 object-cover col-1 row-1 self-end justify-self-end rounded-xs"
        />
      </figure>
      <EventItemText {...dataevent} />
    </article>
  );
};

export default EventItem;
