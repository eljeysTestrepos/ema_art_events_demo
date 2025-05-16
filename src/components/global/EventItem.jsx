"use client";
import Image from "next/image";
import Placeholder from "@/app/assets/img/placeholder.png";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Link from "next/link";
import Button from "./CustomButton";

const EventItem = (dataevent, SMKItems) => {
  console.log("eventItem: ", "SMK: ", SMKItems, "eventList: ", dataevent);

  return (
    <article className="grid grid-cols-2 gap-8 p-12">
      <figure className="relative h-[400px] mb-4">
        <Image
          src={Placeholder}
          alt="noget"
          width={500}
          height={500}
          className="block h-[325px] w-[250px] absolute top-0 right-0 z-2 rounded-xl"
        ></Image>
        <div className="absolute bottom-0 left-0 h-[325px] w-[250px]  bg-black rounded-xl">
          her er en farve til billede
        </div>
      </figure>
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>{dataevent.title}</CardTitle>
          <CardDescription>{dataevent.date}</CardDescription>
          <CardDescription>17.00</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{dataevent.location.name}</p>
          <p>{dataevent.location.address}</p>
          <p>{dataevent.description}</p>
        </CardContent>
        <CardFooter>
          <Link href={`/eventView/${dataevent.id}`}>Læs mere</Link>
          <p>der skal være en pil her istedet for en p</p>
          <Button></Button>
        </CardFooter>
      </Card>
    </article>
  );
};

export default EventItem;
