import CustomButton from "@/components/global/CustomButton";
import OpacityTextBox from "@/components/global/OpacityTextBox";
import Image from "next/image";

export default function PaymentConfirmation() {
  const mockBackgroundColor = "#401F0C";

  const imageUrl =
    "https://iip-thumb.smk.dk/iiif/jp2/9g54xm869_KMS1-cropped.tif.jp2/full/!1024,/0/default.jpg";

  return (
    <>
      <div className="home-background-wrapper max-full max-h-dvh ">
        <Image
          src={imageUrl}
          alt="Maleri fra Statens Museum for Kunst"
          width={1900}
          height={1900}
          className=" h-full w-full"
          priority
        />
      </div>

      <main className="col-[1/2]  max-h-dvh">
        <section
          className="col-1 row-1 z-10"
          style={{ backgroundColor: mockBackgroundColor }}
        >
          <h2 className="text-3xl font-bold mb-4 text-white">
            Tak for din bestilling!
          </h2>
          <p className="text-lg mb-6 text-white">
            Bekræftelse tilsendt til din email.
          </p>
          <CustomButton text="Tilbage til forsiden" link="/" />
        </section>
        <aside className="col-1 row-1 ">
          <OpacityTextBox
            title="Kvittering"
            content="Her er hvad der er blevet købt"
            className="mt-16"
          />
        </aside>
      </main>
    </>
  );
}
