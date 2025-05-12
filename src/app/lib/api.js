export async function getEvent() {
  const dataEvents = await fetch("http://localhost:8080/events"); //skift url med eksterne server side når det er deployet
  const dataevent = await dataEvents.json();
  return dataevent;
}

export async function getEventId(id) {
  const dataEventsid = await fetch("http://localhost:8080/events" + `/:${id}`); //skift url med eksterne server side når det er deployet
  const dataeventid = await dataEventsid.json();
  console.log("HVorfor virker det ik", dataeventid);
  return dataeventid;
}
