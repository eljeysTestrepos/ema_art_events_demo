"use client";
import { useRef } from "react";
import Image from "next/image";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import Placeholder from "@/app/assets/img/placeholder.png";

import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Gallery = ({ galleryData }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const scrollContainerRef = useRef(null);

  const handleThumbnailClick = (artworkIdToSet) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("backgroundArtworkId", artworkIdToSet);

    router.push(`${pathname}?${newSearchParams.toString()}`, {
      scroll: false,
    });
  };

  const currentSelectedArtworkId = searchParams.get("backgroundArtworkId");

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -280, // Eks: 3 thumbnails (80px * 3) + 2 gaps (8px * 2) + lidt padding
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 280,
        behavior: "smooth",
      });
    }
  };

  if (!galleryData || galleryData.length === 0) {
    return (
      <p className="text-white bg-opacity-50 p-2 rounded-md">
        Ingen billeder tilgængelige for galleriet.
      </p>
    );
  }

  return (
    <section className="flex flex-col items-center">
      <div className="relative flex items-center justify-center bg-opacity-50 p-2 rounded-lg shadow-lg">
        <button
          onClick={scrollLeft}
          className="p-2 text-black bg-white bg-opacity-70 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-black z-10"
          aria-label="Scroll left"
        >
          <FaArrowLeft />
        </button>

        <div
          ref={scrollContainerRef}
          className="flex flex-row gap-2 overflow-x-scroll scrollbar-hide snap-x snap-mandatory px-2"
          style={{
            scrollSnapType: "x mandatory",
            width: "calc(3 * 80px + 2 * 8px + 2 * 16px)",
          }}
        >
          {galleryData.map((artwork, index) => (
            <button
              key={artwork.id || index}
              onClick={() => handleThumbnailClick(artwork.id)}
              className={`relative flex-shrink-0 w-20 h-20 rounded-md overflow-hidden cursor-pointer transition-opacity duration-300 shadow-md snap-start ${
                currentSelectedArtworkId === artwork.id ||
                (!currentSelectedArtworkId && index === 0)
                  ? "opacity-100 ring-2 ring-black"
                  : "opacity-60 hover:opacity-100"
              }`}
            >
              <Image
                src={artwork.thumbnail || Placeholder.src}
                alt={`Miniature ${artwork.id || index + 1}`}
                fill
                objectFit="cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>

        <button
          onClick={scrollRight}
          className="p-2 text-black bg-white bg-opacity-70 rounded-full hover:bg-opacity-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-black z-10"
          aria-label="Scroll right"
        >
          <FaArrowRight />
        </button>
      </div>
    </section>
  );
};

export default Gallery;
