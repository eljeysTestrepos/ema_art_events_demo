import Button from "@/app/components/global/Button";
import Filter from "@/app/components/global/Filter";
import SearchBar from "@/app/components/global/SearchBar";
import EventForm from "@/app/components/kurator_create_edit/EventForm";
import Gallery from "@/app/components/kurator_create_edit/Gallery";
import Options from "@/app/components/kurator_create_edit/Options";
import Step from "@/app/components/kurator_create_edit/Step";

const Create_Edit = () => {
  return (
    <main>
      <h1 className="text-h1">Create_Edit</h1>
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
};

export default Create_Edit;
