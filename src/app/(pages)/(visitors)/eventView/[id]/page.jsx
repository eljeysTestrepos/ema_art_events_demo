import Button from "@/components/global/CustomButton";
import OpacityTextBox from "@/components/global/OpacityTextBox";

export default async function EventView({ params }) {
  const { id } = await params;

  return (
    <main>
      <h1>EventView {id}</h1>
      <section>
        <OpacityTextBox />
        <Button />
      </section>
      <section></section>
    </main>
  );
}
