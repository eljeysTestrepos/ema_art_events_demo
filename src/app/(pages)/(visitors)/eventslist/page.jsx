import Basket from "@/app/components/global/Basket";
import EventItem from "@/app/components/global/EventItem";
import Filter from "@/app/components/global/Filter";
import SearchBar from "@/app/components/global/SearchBar";
import { getEvent } from "@/app/lib/api";
export default function EventsList() {
  const eventList = getEvent();
  // console.log(eventList);
  return (
    <main>
      <h1>Eventslist</h1>
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
