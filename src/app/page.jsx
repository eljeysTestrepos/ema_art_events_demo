import Image from "next/image";
import CustomButton from "../components/global/CustomButton";
import DiasShow from "../components/home/DiasShow";
import OpacityTextBox from "../components/global/OpacityTextBox";

export default function Home() {
  const openingHours = `Tirsdag - søndag 10 - 18 <br />
Onsdag 10 – 20 <br />
Mandag Lukket`;

  return (
    <main className="">
      <DiasShow />
      <h1 className="col-start-1 row-start-1">Statens Museum for Kunst</h1>
      <CustomButton
        className="w-fit col-start-1 row-start-2 h-fit"
        text="Se alle events"
        link="/events"
      />
      <OpacityTextBox
        className="w-fit p-4 col-start-2 row-start-2 justify-self-end"
        title="Åbningstider"
        content={<p dangerouslySetInnerHTML={{ __html: openingHours }} />}
      />
      {/* fortæller react at der ikke er noget farligt ved at der bliver sat direkte html ind via strengen. Ikke farligt fordi jeg hardcoder */}
    </main>
  );
}
