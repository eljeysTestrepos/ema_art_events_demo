import { getEvent } from "@/lib/api";

import Basket from "@/components/global/Basket";
import EventItem from "@/components/global/EventItem";
import Filter from "@/components/global/Filter";
import SearchBar from "@/components/global/SearchBar";

export default async function Events() {
  const eventList = await getEvent();

  console.log("events page: ", "eventList: ", eventList);

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
