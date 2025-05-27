import Step from "@/components/kurator_create_edit/Step";
import { useForm } from "react-hook-form";
import { getEventDates, getSMK, getSMKImg } from "@/lib/api";
import EventForm from "@/components/kurator_create_edit/EventForm";
import KuratorForm from "@/components/kurator_create_edit/KuratorForm";

export default async function Create_Edit() {
  const SMKItems = await getSMK();
  // console.log("data 2", SMKImg);
  return <KuratorForm smk={SMKItems} />;
}
