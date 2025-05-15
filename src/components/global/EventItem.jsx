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

const EventItem = (dataevent, SMKData) => {
  return (
    <article className="grid grid-cols-2">
      <figure>
        {/* Hvis Event id har object_number så skal den finde object_number i SMK og spytte image ud  */}
        {/* {if (dataevent.) {

        }} */}
        <Image src={Placeholder} alt="noget" width={500} height={500}></Image>
        <div>her er en farve til billede</div>
      </figure>
      <Card>
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
          <Link href={`/eventView/:${dataevent.id}`}>Læs mere</Link>
          <p>der skal være en pil her istedet for en p</p>
          <Button></Button>
        </CardFooter>
      </Card>
    </article>
  );
};

export default EventItem;
