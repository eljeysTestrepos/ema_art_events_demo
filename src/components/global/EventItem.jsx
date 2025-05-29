import Image from "next/image";
import Placeholder from "@/app/assets/img/placeholder.png";

import EventItemText from "./EventItemText";

const EventItem = (dataevent) => {
  const artImg = dataevent.artImg;

  return (
    <article className="grid grid-cols-1 grid-rows-auto @min-[475px]:grid-cols-2 @min-[475px]:grid-rows-1">
      <figure className="md:col-1 grid grid-cols-1 grid-rows-1">
        <div
          className={`w-[200px] h-[250px] rounded-xl row-start-1 col-start-1`}
          style={{ backgroundColor: `${artImg.suggested_bg_color}` }}
        ></div>

        <Image
          src={artImg?.image_thumbnail || Placeholder}
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
