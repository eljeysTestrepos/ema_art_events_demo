import Step from "@/components/kurator_create_edit/Step";
import { useForm } from "react-hook-form";
import { getEventDates } from "@/lib/api";
import EventForm from "@/components/kurator_create_edit/EventForm";
import KuratorForm from "@/components/kurator_create_edit/KuratorForm";

export default function Create_Edit() {
  return <KuratorForm />;
}
