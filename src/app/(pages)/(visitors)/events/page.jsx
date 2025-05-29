import {
  getEvent,
  getEventDates,
  getEventLocations,
  getSMK,
  getArtworkByEventID,
} from "@/lib/api";

import EventListWithFilter from "@/components/global/EventListWithFilter";

export default async function Events() {
  const eventListRaw = await getEvent();
  const eventsDates = await getEventDates();
  const smk = await getSMK();
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
      <div className="@container">
        <EventListWithFilter
          initialEvents={eventListWithArtwork}
          availableDates={eventsDates}
          availableLocations={eventsLocations}
        />
      </div>
    </main>
  );
}
