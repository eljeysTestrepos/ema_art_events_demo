import { getEvent, getEventId, getSMK } from "@/lib/api";

import Basket from "@/components/global/Basket";
import EventItem from "@/components/global/EventItem";
import Filter from "@/components/global/Filter";
import SearchBar from "@/components/global/SearchBar";

export default async function Events() {
  const SMKData = await getSMK();
  const eventList = await getEvent();
  return (
    <main>
      <section>
        {eventList.map((dataevent) => {
          return <EventItem key={dataevent.id} {...dataevent} {...SMKData} />;
        })}
      </section>
      <aside>
        <SearchBar></SearchBar>
        <Filter></Filter>
        <Basket {...dataevent}></Basket>
      </aside>
    </main>
  );
}
