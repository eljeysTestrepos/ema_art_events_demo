import { headers } from "next/headers";

export async function getEvent() {
  const dataEvents = await fetch("http://localhost:8080/events"); //skift url med eksterne server side når det er deployet
  const dataevent = await dataEvents.json();
  return dataevent;
}

export async function getEventId(id) {
  const dataEventsid = await fetch("http://localhost:8080/events" + `/:${id}`); //skift url med eksterne server side når det er deployet
  const dataeventid = await dataEventsid.json();
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
  console.log("api.js :", datasSMK);
  return dataSMK;
}
