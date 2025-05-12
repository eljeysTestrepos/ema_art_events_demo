import EventItem from "@/app/components/global/EventItem";
import Filter from "@/app/components/global/Filter";
import SearchBar from "@/app/components/global/SearchBar";
import { getEvent } from "@/app/lib/api";

export default async function Dashboard() {
  const eventList = await getEvent();
  console.log(eventList);
  return (
    <main>
      <h1>Dashboard</h1>
      <section>
        {eventList.map((event) => {
          // console.log(eventList);
          return <EventItem key={event.id} {...event} />;
        })}
      </section>
      <aside>
        <SearchBar />
        <Filter />
      </aside>
    </main>
  );
}
