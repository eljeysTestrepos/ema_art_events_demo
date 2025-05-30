// ASYNC SERVER FRA DANNIE ENDPOINTS

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
  const EventsDates = await fetch("http://localhost:8080/dates"); //skift url med eksterne server side når det er deployet
  const eventsdates = await EventsDates.json();
  return eventsdates;
}

export async function getEventLocations() {
  const EventsLocations = await fetch("http://localhost:8080/locations"); //skift url med eksterne server side når det er deployet
  const eventslocations = await EventsLocations.json();
  return eventslocations;
}

// SMK ENDPOINTS

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

//Billeder til Kurator Create/Edit
export async function getSMKImg() {
  const datasSMK = await fetch(
    "https://api.smk.dk/api/v1/art/search?keys=*&filters=[has_image:true]&offset=0&rows=50",
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const dataSMK = await datasSMK.json();
  const SMKimages = dataSMK.items;
  return SMKimages;
}
//Billeder til EventList, Event SingleView
export async function getArtworkByEventID(objectNumber) {
  const url = `https://api.smk.dk/api/v1/art?object_number=${objectNumber}`;
  const res = await fetch(url);
  const data = await res.json();
  const artImg = data.items?.[0];
  return artImg;
}

// Til Kurator Filtering og Description til Singleview.
export async function getSMKFilter() {
  const datasSMK = await fetch(
    "https://api.smk.dk/api/v1/art/search/?keys=*&offset=0&rows=3",
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const dataSMK = await datasSMK.json();
  const SMKData = dataSMK.items;

  const dataTechniques = SMKData.flatMap((item) => item.techniques || []);
  const dataArtists = SMKData.flatMap((item) => item.artist || []);

  return { dataTechniques, dataArtists };
}
