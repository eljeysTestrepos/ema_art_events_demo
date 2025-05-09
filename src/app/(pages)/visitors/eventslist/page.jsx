import Basket from "@/app/components/global/Basket";
import EventItem from "@/app/components/global/EventItem";
import Filter from "@/app/components/global/Filter";
import SearchBar from "@/app/components/global/SearchBar";

const EventsList = () => {
  return (
    <main>
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
};

export default EventsList;
