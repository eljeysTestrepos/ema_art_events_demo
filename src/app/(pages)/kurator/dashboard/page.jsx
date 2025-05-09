import EventItem from "@/app/components/global/EventItem";
import Filter from "@/app/components/global/Filter";
import SearchBar from "@/app/components/global/SearchBar";

const Dashboard = () => {
  return (
    <main>
      <h1>Dashboard</h1>
      <section>
        <EventItem />
      </section>
      <aside>
        <SearchBar />
        <Filter />
      </aside>
    </main>
  );
};

export default Dashboard;
