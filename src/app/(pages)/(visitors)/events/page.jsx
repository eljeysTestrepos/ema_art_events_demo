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
      <div className="@container">
        <section className="grid @sm:grid-cols-1 @min-[900px]:grid-cols-1 @lg:grid-cols-2 @min-[900px]:row-auto">
          {eventList.map((dataevent) => {
            // console.log("events page mapping: ", "eventList: ", dataevent);
            return <EventItem key={dataevent.id} {...dataevent} />;
          })}
        </section>
      </div>
      <aside className="row-1 flex flex-row items-center justify-between px-(--space-2rem) py-(--space-1rem) ">
        <SearchBar></SearchBar>
        <Filter></Filter>
      </aside>
    </main>
  );
}
