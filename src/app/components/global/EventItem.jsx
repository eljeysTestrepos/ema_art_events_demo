"use client";
import Image from "next/image";
import Placeholder from "@/app/assets/img/placeholder.png";

import Link from "next/link";
import Button from "./Button";

const EventItem = () => {
  return (
    <article>
      <h1>I am an EventItem</h1>
      <figure>
        <Image src={Placeholder} alt="noget" width={500} height={500}></Image>
        <div>her er en farve til billede</div>
      </figure>
      <aside>
        <h1>Titel på Event</h1>
        <div>
          <p>dato</p>
          <p>tid</p>
        </div>
        <p>Galleri B</p>
        <p>lokation</p>
        <p>describtion ...</p>
        <div>
          <Link href={"/"}>Læs mere</Link>
          <p>der skal være en pil her istedet for en p</p>
        </div>
        <Button></Button>
      </aside>
    </article>
  );
};

export default EventItem;
