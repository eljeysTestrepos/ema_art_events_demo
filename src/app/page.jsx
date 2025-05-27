import Image from "next/image";
import Button from "../components/global/CustomButton";
import DiasShow from "../components/home/DiasShow";
import OpacityTextBox from "../components/global/OpacityTextBox";
import Gallery from "@/components/eventView/Gallery";
export default function Home() {
  const openingHours = `Tirsdag – søndag 10 – 18
Onsdag 10 – 20
Mandag Lukket`;

  return (
    <main className="">
      <DiasShow />
      <Button />
      <OpacityTextBox title="Åbningstider" content={<p>{openingHours}</p>} />
    </main>
  );
}
