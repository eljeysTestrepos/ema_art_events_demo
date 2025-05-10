import Basket from "@/app/components/global/Basket";
import EventItem from "@/app/components/global/EventItem";
import Filter from "@/app/components/global/Filter";
import SearchBar from "@/app/components/global/SearchBar";

export default function EventsList() {
  return (
    <main>
      <h1>Eventslist</h1>
      <section>
        <EventItem />
      </section>
      <aside>
        <SearchBar></SearchBar>
        <Filter></Filter>
        <Basket></Basket>
      </aside>
    </main>
  );
}
