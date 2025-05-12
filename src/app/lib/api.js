export async function getEvent() {
  const dataEvents = await fetch("http://localhost:localhost:8080/events");
  const dataevent = await dataEvents.json();
  return dataevent;
}
