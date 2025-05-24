//Event Server
export async function getEvent() {
  const dataEvents = await fetch("http://localhost:8080/events?limit=*"); //skift url med eksterne server side når det er deployet
  const dataevent = await dataEvents.json();
  return dataevent;
}

export async function getEventId(id) {
  const dataEventsids = await fetch("http://localhost:8080/events" + `/${id}`); //skift url med eksterne server side når det er deployet
  const dataeventid = await dataEventsids.json();
  return dataeventid;
}

export async function getEventDates() {
  const dataDates = await fetch("http://localhost:8080/dates"); //skift url med eksterne server side når det er deployet
  let dataDate = await dataDates.json();
  return dataDate;
}
export async function getEventLocation() {
  const dataLocations = await fetch("http://localhost:8080/locations"); //skift url med eksterne server side når det er deployet
  let dataLocation = await dataLocations.json();
  return dataLocation;
}

// SMK APIS
export async function getSMK() {
  const datasSMK = await fetch(
    "https://api.smk.dk/api/v1/art/search/?keys=*&offset=0&rows=10",
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const dataSMK = await datasSMK.json();
  const SMKItems = dataSMK.items;
  return SMKItems;
}

export async function getArtworkByEventID(objectNumber) {
  const url = `https://api.smk.dk/api/v1/art?object_number=${objectNumber}`;
  const res = await fetch(url);
  const data = await res.json();
  const artImg = data.items?.[0];
  return artImg;
}

export async function getEventDates() {
  const EventsDates = await fetch("http://localhost:8080/dates"); //skift url med eksterne server side når det er deployet
  const eventsdates = await EventsDates.json();
  return eventsdates;
}

export async function getEventLocations() {
  const EventsLocations = await fetch("http://localhost:8080/locations"); //skift url med eksterne server side når det er deployet
  const eventslocations = await EventsLocations.json();
  return eventslocations;
}
