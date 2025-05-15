export async function getEvent() {
  const dataEvents = await fetch("http://localhost:8080/events"); //skift url med eksterne server side når det er deployet
  const dataevent = await dataEvents.json();
  console.log("Hvad er her under API Page? (dataevent)" + dataevent);
  return dataevent;
}

export async function getEventId(id) {
  const dataEventsid = await fetch("http://localhost:8080/events" + `/:${id}`); //skift url med eksterne server side når det er deployet
  const dataeventid = await dataEventsid.json();
  console.log("Hvad er her under API Page? (dataeventid)" + dataeventid);
  return dataeventid;
}

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
  return dataSMK;
}
