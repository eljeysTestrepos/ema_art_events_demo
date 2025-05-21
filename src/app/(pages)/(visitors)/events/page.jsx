import { getEvent, getEventDateNLocation } from "@/lib/api";

import EventItem from "@/components/global/EventItem";
import Filter from "@/components/global/Filter";
import SearchBar from "@/components/global/SearchBar";

import "@/lib/filter.js";
import { getFilter } from "@/lib/filter.js";

export default async function Events() {
  const eventList = await getEvent();
  const filtertry = await getFilter();
  console.log("events page: ", "eventList: ", eventList);

  // Filter

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
      </aside>
    </main>
  );
}
