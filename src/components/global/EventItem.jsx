import Image from "next/image";
import Placeholder from "@/app/assets/img/placeholder.png";

import EventItemText from "./EventItemText";

const EventItem = (dataevent) => {
  const artImg = dataevent.artImg;

  return (
    <article className="grid grid-cols-2 p-6 md:grid-cols-[auto_1fr] md:gap-6 md:flex-row">
      <figure className="max-w-[250px] mb-6 grid grid-rows-1 md:flex-shrink-0">
        <div
          className={`w-[200px] h-[250px] rounded-xl row-start-1 col-start-1`}
          style={{ backgroundColor: artImg?.suggested_bg_color || "#CCCCCC" }}
        ></div>
        <Image
          src={artImg?.image_thumbnail || Placeholder}
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
