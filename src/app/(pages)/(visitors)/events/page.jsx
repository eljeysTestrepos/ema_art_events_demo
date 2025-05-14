import Basket from "@/components/global/Basket";
import EventItem from "@/components/global/EventItem";
import Filter from "@/components/global/Filter";
import SearchBar from "@/components/global/SearchBar";
import { getEvent, getEventId } from "@/lib/api";

export default async function EventsList() {
  const eventList = await getEvent();
  return (
    <main className="">
      <section>
        {eventList.map((event) => {
          console.log(event);
          return <EventItem key={event.id} {...event} />;
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
