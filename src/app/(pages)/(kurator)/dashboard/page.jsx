import {
  getEvent,
  getArtworkByEventID,
  getEventDates,
  getEventLocations,
} from "@/lib/api";
import { currentUser } from "@clerk/nextjs/server";
import EventListWithFilter from "@/components/global/EventListWithFilter";

export default async function Dashboard() {
  const user = await currentUser();
  const eventListRaw = await getEvent();
  const eventsDates = await getEventDates();
  const eventsLocations = await getEventLocations();

  const eventListWithArtwork = await Promise.all(
    eventListRaw.map(async (event) => {
      let artImgData = null;
      if (event.artworkIds && event.artworkIds.length > 0) {
        artImgData = await getArtworkByEventID(event.artworkIds[0]);
      }
      return {
        ...event,
        artImg: artImgData,
      };
    })
  );

  return (
    <main>
      <h3 className="col-span-2">Velkommen tilbage {user?.firstName} </h3>

      <EventListWithFilter
        initialEvents={eventListWithArtwork}
        availableDates={eventsDates}
        availableLocations={eventsLocations}
      />
    </main>
  );
}
