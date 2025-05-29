import EventItem from "@/components/global/EventItem";
import Filter from "@/components/global/Filter";
import { getEvent } from "@/lib/api";
import { auth, currentUser } from "@clerk/nextjs/server";

export default async function Dashboard() {
  const user = await currentUser(); //Henter alt data på den bruger der er logget ind.
  // console.log("dette er auth data: ", user);
  const eventList = await getEvent();
  console.log(eventList);
  return (
    <main>
      <h3 className="col-span-2">Velkommen tilbage {user?.firstName} </h3>
      <section>
        {eventList.map((event) => {
          // console.log(eventList);
          return <EventItem key={event.id} {...event} />;
        })}
      </section>
      <aside>
        <Filter />
      </aside>
    </main>
  );
}
