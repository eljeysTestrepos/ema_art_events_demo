import { getEvent } from "@/lib/api";

import EventItem from "@/components/global/EventItem";
import Filter from "@/components/global/Filter";
import SearchBar from "@/components/global/SearchBar";

export default async function Events() {
  const eventList = await getEvent();

  // const params = await props.params;
  // const searchParams = await props.searchParams;
  // const q = params.q;
  // const query = searchParams.query;

  console.log("events page: ", "SMK: ", SMKItems, "eventList: ", eventList);

  console.log("events page: ", "eventList: ", eventList);

  return (
    <main>
      <section>
        {eventList.map((dataevent) => {
          console.log("events page mapping: ", "eventList: ", dataevent);
          return <EventItem key={dataevent.id} {...dataevent} />;
        })}
      </section>
      <aside>
        <SearchBar {...SMKItems} {...eventList}></SearchBar>
        <Filter></Filter>
      </aside>
    </main>
  );
}
