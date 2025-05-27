import Image from "next/image";
import ImageCard from "./ImageCard";
import { useEffect, useState } from "react";

const Gallery = (SMKItems) => {
  <h1>Hej</h1>;
  console.log("Data 3 ", SMKItems);
  {
    SMKItems.map((dataSmk) => {
      console.log("Dette er smkdata", dataSmk);
      return <Image src key={dataSmk.id} />;
    });
  }
};
export default Gallery;
