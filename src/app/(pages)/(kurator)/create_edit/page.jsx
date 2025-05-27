import Step from "@/components/kurator_create_edit/Step";
import { useForm } from "react-hook-form";
import { getEventDates, getSMK } from "@/lib/api";
import EventForm from "@/components/kurator_create_edit/EventForm";
import KuratorForm from "@/components/kurator_create_edit/KuratorForm";

export default async function Create_Edit() {
  const SMKItems = await getSMK();
  console.log("Data", SMKItems);
  return <KuratorForm {...SMKItems} />;
}
