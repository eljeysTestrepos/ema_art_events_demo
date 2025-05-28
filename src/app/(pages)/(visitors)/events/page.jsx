import { getEvent } from "@/lib/api";

import Basket from "@/components/global/Basket";
import EventItem from "@/components/global/EventItem";
import Filter from "@/components/global/Filter";
import SearchBar from "@/components/global/SearchBar";

export default async function Events() {
  const eventList = await getEvent();

  // console.log("events page: ", "eventList: ", eventList);

  return (
    <main>
      <section className="pr-(--space-3rem)">
        {eventList.map((dataevent) => {
          // console.log("events page mapping: ", "eventList: ", dataevent);
          return <EventItem key={dataevent.id} {...dataevent} />;
        })}
      </section>
      <aside className="row-1 md:col-2">
        <SearchBar></SearchBar>
        <Filter></Filter>
      </aside>
    </main>
  );
}
