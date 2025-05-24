import { getEvent, getEventDateNLocation } from "@/lib/api";

import EventItem from "@/components/global/EventItem";
import Filter from "@/components/global/Filter";
import SearchBar from "@/components/global/SearchBar";

import "@/lib/filter.js";
import { getFilter } from "@/lib/filter.js";

export default async function Events() {
  const eventList = await getEvent();

  // console.log("events page: ", "eventList: ", eventList);

  // Filter

  return (
    <main>
      <section>
        {eventList.map((dataevent) => {
          // console.log("events page mapping: ", "eventList: ", dataevent);
          return <EventItem key={dataevent.id} {...dataevent} />;
        })}
      </section>
      <aside>
        <SearchBar></SearchBar>
        <Filter></Filter>
      </aside>
    </main>
  );
}
