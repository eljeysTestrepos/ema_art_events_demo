import OpacityBoxSingleview from "@/components/eventView/OpacityBoxSingleview";
import Button from "@/components/global/CustomButton";
import OpacityTextBox from "@/components/global/OpacityTextBox";

export default async function EventView({ params }) {
  const { id } = await params;

  return (
    <main>
      <h1>EventView {id}</h1>
      <section>
        <OpacityBoxSingleview
          title={`${dataEventsid.title}`}
          content={`${dataEventsid.description}`}
        />
        <Button />
      </section>
      <section></section>
    </main>
  );
}
