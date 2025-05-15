import Button from "@/components/global/Button";
import OpacityTextBox from "@/components/global/OpacityTextBox";
import { getSMK, getEventId } from "@/lib/api";
import { Image } from "lucide-react";

export default async function EventView({ params }) {
  const { id } = await params;
  const dataeventid = await getEventId(id);
  const SMKItems = await getSMK();
  console.log(
    "SingleView page: ",
    "SMKData: ",
    SMKItems,
    "dataeventid: ",
    dataeventid
  );

  return (
    <main>
      <h1>EventView {id}</h1>
      <section>
        <Image></Image>
        <OpacityTextBox />
        <Button />
      </section>
      <section></section>
    </main>
  );
}
