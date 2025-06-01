import KuratorForm from "@/components/kurator_create_edit/KuratorForm";
import {
  getSMKImg,
  getEventId,
  getEventLocations,
  getEventDates,
  getSMKFilterCat,
} from "@/lib/api";

export default async function CreateEditEventPage({ searchParams }) {
  //Filter start
  const categories = await getSMKFilterCat();
  //Filter end
  const eventId = await searchParams.eventId;

  let initialEventData = null;
  let maxImagesForLocation = 0;
  let locations = [];
  let eventDates = [];

  {
    const fetchedLocations = await getEventLocations();
    if (Array.isArray(fetchedLocations)) {
      locations = fetchedLocations;
    }
  }

  const fetchedEventDates = await getEventDates();
  if (Array.isArray(fetchedEventDates)) {
    eventDates = fetchedEventDates;
  }

  const smkGeneralImages = await getSMKImg();

  if (eventId) {
    try {
      initialEventData = await getEventId(eventId);
      console.log(
        "SERVER LOG: Fetched initial event data for editing:",
        initialEventData
      );

      if (
        initialEventData &&
        initialEventData.locationId &&
        Array.isArray(locations)
      ) {
        const selectedLocation = locations.find(
          (loc) => String(loc.id) === String(initialEventData.locationId)
        );

        if (selectedLocation) {
          maxImagesForLocation = Number(selectedLocation.maxArtworks) || 0;
          console.log(
            "SERVER LOG: Max images for selected location (from fetched event):",
            maxImagesForLocation
          );
        }
      }
    } catch (error) {
      console.error(
        `SERVER ERROR: Error fetching event with ID ${eventId}:`,
        error
      );
      initialEventData = null;
    }
  } else {
    console.log(
      "SERVER LOG: No eventId found in searchParams, creating new event."
    );
  }
  const finalSmkDataForGallery = { smk: smkGeneralImages || [] };

  return (
    <KuratorForm
      initialEventData={initialEventData}
      smk={finalSmkDataForGallery}
      maxImages={maxImagesForLocation}
      eventsLocations={locations}
      eventDates={eventDates}
      filterCategories={categories}
    />
  );
}
