export async function getEvent() {
  const dataEvents = await fetch("http://localhost:8080/events"); //skift url med eksterne server side når det er deployet
  const dataevent = await dataEvents.json();
  console.log(dataevent);
  return dataevent;
}
