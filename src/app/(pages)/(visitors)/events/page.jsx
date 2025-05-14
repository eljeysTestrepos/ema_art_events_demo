import { getEvent, getSMK } from "@/lib/api";

import Basket from "@/components/global/Basket";
import EventItem from "@/components/global/EventItem";
import Filter from "@/components/global/Filter";
import SearchBar from "@/components/global/SearchBar";

export default async function Page() {
  const data = await getSMK();
  const events = await getEvent();
  console.log("events test: ", data);
  return (
    <main>
      <section>
        {events.map((event) => {
          return <EventItem key={event.id} {...event} />;
        })}
      </section>
      <aside>
        <SearchBar></SearchBar>
        <Filter></Filter>
        <Basket {...events}></Basket>
      </aside>
    </main>
  );
}
