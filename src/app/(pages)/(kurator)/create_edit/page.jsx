import Step from "@/components/kurator_create_edit/Step";
import { useForm } from "react-hook-form";
import {
  getEventDates,
  getSMK,
  getSMKImg,
  getSMKFilter,
  getEventLocations,
} from "@/lib/api";
import EventForm from "@/components/kurator_create_edit/EventForm";
import KuratorForm from "@/components/kurator_create_edit/KuratorForm";

export default async function Create_Edit() {
  const { dataArtists, dataTechniques } = await getSMKFilter();
  console.log(
    "Page create_edit: dataArtists: ",
    dataArtists,
    "dataTechniques: ",
    dataTechniques
  );

  const SMKItems = await getSMKImg();
  const eventsdates = await getEventDates();
  const eventslocations = await getEventLocations();
  return (
    <KuratorForm
      smk={SMKItems}
      dataArtists={dataArtists}
      dataTechniques={dataTechniques}
      eventsDates={eventsdates}
      eventsLocations={eventslocations}
    />
  );
}
