import Image from "next/image";

const Gallery = ({
  smkdata,
  selectedImages,
  handleImageSelect,
  maxImages,
  locationSelected,
}) => {
  console.log("Gallery - smkdata modtaget:", smkdata);

  if (!locationSelected) {
    return (
      <p className="text-black">
        Vælg venligst en lokation for at vælge billeder.
      </p>
    );
  }

  // smkdata er et objekt {smk: [...billeder]}, så vi skal have fat i .smk arrayet
  const images = smkdata.smk || [];

  return (
    <div className="grid grid-cols-3 gap-4">
      {images.map((dataSmk) => {
        // Brug 'images' arrayet
        // if (
        //   !dataSmk ||
        //   !dataSmk.image_thumbnail ||
        //   typeof dataSmk.image_thumbnail !== "string" ||
        //   dataSmk.image_thumbnail.trim() === ""
        // ) {
        //   console.warn(
        //     `Springede billede over pga. manglende/ugyldig image_thumbnail:`,
        //     dataSmk
        //   );
        //   return null; // Spring over rendering af dette billede
        // }

        const isSelected = selectedImages.includes(dataSmk.id);
        const isDisabled = !isSelected && selectedImages.length >= maxImages;

        return (
          <div
            key={dataSmk.id}
            className={`
              relative cursor-pointer border-2 p-2
              ${
                isSelected
                  ? "border-blue-500 ring-4 ring-blue-300"
                  : "border-gray-300"
              }
              ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}
            `}
            onClick={() => !isDisabled && handleImageSelect(dataSmk.id)}
          >
            <Image
              src={dataSmk.image_thumbnail}
              width={150}
              height={150}
              alt={dataSmk.title || "SMK billede"}
              className="w-full h-auto object-cover"
            />
            {isSelected && (
              <div className="absolute top-2 right-2 bg-blue-500 text-white rounded-full p-1 text-xs">
                ✓
              </div>
            )}
            <p className="text-sm mt-2">{dataSmk.title}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Gallery;
