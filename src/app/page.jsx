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

      <main className="relative z-10 w-full min-h-screen p-6 gap-4">
        <h1 className="md:col-start-1 md:row-1 md:pt-(--space-4rem) text-white">
          Statens Museum for Kunst
        </h1>
        <CustomButton
          className="w-fit md:col-start-1 md:row-start-2 h-fit"
          text="Se alle events"
          link="/events"
        />
        <OpacityTextBox
          className="w-fit md:col-start-2 md:row-start-2 md:(--space-4rem)"
          title="Åbningstider"
          content={<p dangerouslySetInnerHTML={{ __html: openingHours }} />}
        />
      </main>
    </>
  );
}
