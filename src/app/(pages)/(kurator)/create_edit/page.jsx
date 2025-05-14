import Button from "@/components/global/Button";
import Filter from "@/components/global/Filter";
import SearchBar from "@/components/global/SearchBar";
import EventForm from "@/components/kurator_create_edit/EventForm";
import Gallery from "@/components/kurator_create_edit/Gallery";
import Options from "@/components/kurator_create_edit/Options";
import Step from "@/components/kurator_create_edit/Step";

export default function Create_Edit() {
  return (
    <main>
      <h1>Create_Edit</h1>
      <section>
        <Step />
        <Options />
        <Step />
        <Gallery />
        <Step />
        <EventForm />
      </section>
      <aside>
        <SearchBar />
        <Filter />
      </aside>
      <Button />
    </main>
  );
}
