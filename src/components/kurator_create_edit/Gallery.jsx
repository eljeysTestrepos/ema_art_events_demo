import Image from "next/image";
import ImageCard from "./ImageCard";
import { useEffect, useState } from "react";
import { getSMK } from "@/lib/api";

export function Gallery({ onSelevImages, selectedLocation }) {
  const [smkImages, setSmkImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);

  useEffect(() => {
    const fetchAllImages = async () => {
      const images = await getSMK();
      setSmkImages(images);
    };
    fetchAllImages();
  }, []);

  const getLocationImageLimit = (locationId) => {};
}
