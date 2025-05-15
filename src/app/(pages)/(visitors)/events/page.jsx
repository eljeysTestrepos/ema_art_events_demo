import { getEvent, getSMK } from "@/lib/api";

import Basket from "@/components/global/Basket";
import EventItem from "@/components/global/EventItem";
import Filter from "@/components/global/Filter";
import SearchBar from "@/components/global/SearchBar";

export default async function Page() {
  const SMKData = await getSMK();
  const dataevent = await getEvent();
  return (
    <main>
      <section>
        {dataevent.map((dataevent) => {
          return <EventItem key={dataevent.id} {...dataevent} {...SMKData} />;
        })}
      </section>
      <aside>
        <SearchBar></SearchBar>
        <Filter></Filter>
        <Basket {...dataevent}></Basket>
      </aside>
    </main>
  );
}
