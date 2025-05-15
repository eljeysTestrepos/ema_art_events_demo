import { getEvent } from "@/lib/api";

import EventItem from "@/components/global/EventItem";

export default async function Page() {
  const dataEvents = await fetch("http://localhost:8080/events"); //skift url med eksterne server side når det er deployet
  const dataevent = await dataEvents.json();
  return (
    <main>
      <section>
        {dataevent.map((dataevent) => {
          return <EventItem key={dataevent.id} {...dataevent} />;
        })}
      </section>
    </main>
  );
}
