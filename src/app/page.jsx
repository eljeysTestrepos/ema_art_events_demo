import Image from "next/image";
import CustomButton from "../components/global/CustomButton";
import DiasShow from "../components/home/DiasShow";
import OpacityTextBox from "../components/global/OpacityTextBox";
import Gallery from "@/components/eventView/Gallery";
export default function Home() {
  const openingHours = `Tirsdag - søndag 10 - 18 <br />
Onsdag 10 – 20 <br />
Mandag Lukket`;

  const imageUrl =
    "https://iip-thumb.smk.dk/iiif/jp2/9g54xm869_KMS1-cropped.tif.jp2/full/!1024,/0/default.jpg";

  return (
    <>
      <div className="home-background-wrapper relative w-full h-full">
        <Image
          src={imageUrl}
          alt="Maleri fra Statens Museum for Kunst"
          fill
          style={{ objectFit: "cover" }}
          priority
        />
      </div>

      <main className="relative z-10 w-full min-h-screen p-6 grid grid-cols-2 grid-rows-[1fr_auto] gap-4">
        <DiasShow />

        <h1 className="col-start-1 row-start-1 text-white">
          Statens Museum for Kunst
        </h1>
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
      </main>
    </>
  );
}
