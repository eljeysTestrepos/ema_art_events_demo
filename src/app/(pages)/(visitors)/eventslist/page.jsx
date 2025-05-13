import Basket from "@/app/components/global/Basket";
import EventItem from "@/app/components/global/EventItem";
import Filter from "@/app/components/global/Filter";
import SearchBar from "@/app/components/global/SearchBar";
import { getEvent } from "@/app/lib/api";

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
        <Basket {...eventList}></Basket>
      </aside>
    </main>
  );
}
