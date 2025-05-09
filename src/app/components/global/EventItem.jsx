import Image from "next/image";
import Link from "next/link";
import Button from "./Button";
("use client");

const EventItem = () => {
  return (
    <article>
      <h1>I am an EventItem</h1>
      <figure>
        <Image>her er et billede</Image>
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
          <Link>Læs mere</Link>
          <p>der skal være en pil her istedet for en p</p>
        </div>
        <Button></Button>
      </aside>
    </article>
  );
};

export default EventItem;
