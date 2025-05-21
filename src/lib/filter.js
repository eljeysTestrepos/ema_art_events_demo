//
//

import { getEvent } from "./api";

export async function getFilter() {
  const eventList = await getEvent();
  eventList.map((event) => {
    let date = event.date;
    let address = event.location.adress;
    console.log("Jeg er filter date: ", date, "adress", address);
    console.log("to try: ", getFilter(eventList, "2025-05-01"));
  });

  return eventList.filter((date) =>
    date.toLowerCase().includes(query.toLowerCase())
  );
}
