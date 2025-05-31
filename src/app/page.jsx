import Image from "next/image";
import CustomButton from "../components/global/CustomButton";
import OpacityTextBox from "../components/global/OpacityTextBox";
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

      <main className="relative z-10 w-full md:gap-(--space-1rem) md:pl-(--space-2rem)">
        <h1 className="md:w-[15ch] h-fit col-start-1 row-1 pt-(--space-4rem) md:pt-(--space-6rem) text-white">
          Statens Museum for Kunst
        </h1>
        <CustomButton
          className="w-fit sm-col-1 sm-row-1 sm-self-end md:col-start-1 md-row-3 h-fit"
          text="Se alle events"
          link="/events"
        />
        <OpacityTextBox
          className="h-40 w-fit row-3 self-center md:col-start-2 md:row-start-3 md:mb-(--space-4rem)"
          title="Åbningstider"
          content={<p dangerouslySetInnerHTML={{ __html: openingHours }} />}
        />
      </main>
    </>
  );
}
