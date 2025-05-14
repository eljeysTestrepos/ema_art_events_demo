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
import Button from "./Button";

const EventItem = (dataeventid) => {
  return (
    <article className="grid grid-cols-2 gap-4">
      <figure className="relative h-[400px] mb-4">
        <Image
          src={Placeholder}
          alt="noget"
          width={500}
          height={500}
          className="block h-[300px] w-[300px] absolute top-0 right-0 z-2 rounded-xl"
        ></Image>
        <div className="absolute bottom-0 left-0 h-[300px] w-[300px]  bg-black rounded-xl"></div>
      </figure>
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>{dataeventid.title}</CardTitle>
          <CardDescription>{dataeventid.date}</CardDescription>
          <CardDescription>17.00</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{dataeventid.location.name}</p>
          <p>{dataeventid.location.address}</p>
          <p>{dataeventid.description}</p>
        </CardContent>
        <CardFooter>
          <Link href={`/eventView/:${dataeventid.id}`}>Læs mere</Link>
          <p>der skal være en pil her istedet for en p</p>
          <Button></Button>
        </CardFooter>
      </Card>
    </article>
  );
};

export default EventItem;
