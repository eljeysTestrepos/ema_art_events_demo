import { getArtworkByEventID, getEvent, getEventId, getSMK } from "@/lib/api";

import Basket from "@/components/global/Basket";
import EventItem from "@/components/global/EventItem";
import Filter from "@/components/global/Filter";
import SearchBar from "@/components/global/SearchBar";

export default async function Events() {
  const eventList = await getEvent();
  const eventsid = await getEventId();
  const SMK = await getSMK();
  const SMKEvent = await getArtworkByEventID();

  console.log(
    "events page: ",
    "SMK: ",
    SMK,
    "eventList: ",
    eventList,
    "eventsid: ",
    eventsid,
    "SMKEvent: ",
    SMKEvent
  );

  return (
    <main>
      <section>
        {eventList.map((dataevent) => {
          return <EventItem key={dataevent.id} {...dataevent} />;
        })}
      </section>
      <aside>
        <SearchBar></SearchBar>
        <Filter></Filter>
        <Basket></Basket>
      </aside>
    </main>
  );
}
