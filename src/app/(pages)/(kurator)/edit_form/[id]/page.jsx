import KuratorForm from "@/components/kurator_create_edit/KuratorForm";
import { getEventId, getSMK, getSMKImg } from "@/lib/api";

export default async function EditEventPage({ params }) {
  //Her skaffes adgang til event id'et fra urlen
  const eventId = params.id;

  const eventData = await getEventId(eventId);
  //   console.log("Data hentet til redigering af event: ", eventData);

  const SMKItems = { smk: await getSMKImg() };
  //   console.log("dette er SMKITEMS: ", SMKItems);
  if (!eventData) {
    return <div>Event blev ikke fundet</div>;
  }

  return (
    <KuratorForm initialData={eventData} eventId={eventId} smk={SMKItems} />
  );
}
