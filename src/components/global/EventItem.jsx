"use client";

import Image from "next/image";
import Placeholder from "@/app/assets/img/placeholder.png";
import EventItemText from "./EventItemText";

import { useRouter } from "next/navigation";
import useCartStore from "@/stores/ticketStore";
import { useState } from "react";

const EventItem = (dataevent) => {
  const artImg = dataevent.artImg;
  const router = useRouter();
  const { addItem } = useCartStore();

  const [ticketQuantity, setTicketQuantity] = useState(1);

  const handleQuantityChange = (newQuantity) => {
    setTicketQuantity(newQuantity);
  };

  const handleEnrollClick = () => {
    addItem({ ...dataevent, quantity: ticketQuantity });

    router.push(
      `/paymentpage?eventId=${dataevent.id}&quantity=${ticketQuantity}`
    );
  };

  return (
    <article className="grid @max-[474px]:grid-cols-1 @max-[474px]:grid-rows-auto @min-[475px]:grid-cols-2 @min-[475px]:grid-rows-1">
      <figure className="max-w-[210px] h-[325px] md:col-1 grid grid-cols-1 grid-rows-3 ">
        <div
          className={`max-w-[180px] h-[250px] rounded-sm row-span-2 row-start-1 col-start-1`}
          style={{ backgroundColor: `${artImg.suggested_bg_color}` }}
        ></div>
        <div className=" max-w-[180px] h-[250px] col-1 row-start-2 row-span-2 self-end justify-self-end rounded-lg">
          <Image
            src={artImg?.image_thumbnail || Placeholder}
            alt="noget"
            width={500}
            height={500}
            className=" h-full object-cover rounded-lg"
          />
        </div>
      </figure>

      <EventItemText
        {...dataevent}
        totalTickets={dataevent.location.maxGuests}
        bookedTickets={dataevent.bookedTickets}
        showTicketCounter={true}
        onQuantityChange={handleQuantityChange}
        currentQuantity={ticketQuantity}
      ></EventItemText>
    </article>
  );
};

export default EventItem;
