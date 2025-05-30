// app/create_edit/page.js
import { getSMKImg } from "@/lib/api"; // Sørg for at denne import er korrekt
import KuratorForm from "@/components/kurator_create_edit/KuratorForm";

export default async function Create_Edit({ searchParams }) {
  // *** VIGTIGT: getSMKImg() kaldes ALTID her, uanset om det er et nyt event eller redigering ***
  const SMKItems = await getSMKImg();
  console.log(
    "SERVER LOG: SMKItems fetched in Create_Edit (count):",
    SMKItems ? SMKItems.length : "No data"
  );

  const eventId = searchParams.eventId;

  let eventData = null;
  if (eventId) {
    try {
      const response = await fetch(`http://localhost:8080/events/${eventId}`);
      if (response.ok) {
        eventData = await response.json();
        console.log("Fetched event data for editing:", eventData); // Til debugging i SERVER TERMINAL
      } else {
        console.error(
          `Failed to fetch event with ID ${eventId}:`,
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error(`Error fetching event with ID ${eventId}:`, error);
    }
  } else {
    console.log("No eventId found in searchParams, creating new event."); // Til debugging i SERVER TERMINAL
  }

  // Sender altid SMKItems videre til KuratorForm
  return <KuratorForm smk={SMKItems} initialEventData={eventData} />;
}
