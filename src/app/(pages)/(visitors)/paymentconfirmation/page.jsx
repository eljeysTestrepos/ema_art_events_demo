import CustomButton from "@/components/global/CustomButton";
import OpacityTextBox from "@/components/global/OpacityTextBox";
import Image from "next/image";

export default function PaymentConfirmation() {
  const mockBackgroundColor = "#401F0C";

  const imageUrl =
    "https://iip-thumb.smk.dk/iiif/jp2/9g54xm869_KMS1-cropped.tif.jp2/full/!1024,/0/default.jpg";

  return (
    <>
      <div className="home-background-wrapper relative w-full h-screen">
        <Image
          src={imageUrl}
          alt="Maleri fra Statens Museum for Kunst"
          fill
          style={{ objectFit: "cover" }}
          priority
        />
      </div>

      <main className="z-10  w-full h-full gap-2.5">
        <section
          className="
           mt-16 col-1 p-8 rounded-sm shadow-md h-[80vh] text-right
          "
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
        <aside>
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
