import Image from "next/image";
import ImageCard from "./ImageCard";
import { getSMK } from "@/lib/api";

const Gallery = ({ smkdata }) => {
  // const dataArray = Object.values(smkdata);
  // console.log("Data 3 ", smkdata.image_thumbnail);

  return (
    <div>
      {smkdata.smk.map((dataSmk) => {
        return (
          <Image
            key={dataSmk.id}
            src={dataSmk.image_thumbnail}
            width={150}
            height={150}
            alt="ild"
          />
        );
      })}
    </div>
  );
  // {
  //   smkdata.smk.map((dataSmk) => {
  //     console.log("data4 ", dataSmk.created);

  //     return (
  //       <p key={dataSmk.id} className="text-black">
  //         {dataSmk.id}
  //       </p>
  //       // return <Image src={dataSmk.image_thumbnail} key={dataSmk.id} />;
  //     );
  //   });
  // }
};

export default Gallery;
