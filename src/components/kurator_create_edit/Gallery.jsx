"use client";
import Filter from "../global/Filter";
import Image from "next/image";

const Gallery = ({
  smkdata,
  selectedImages,
  handleImageSelect,
  maxImages,
  locationSelected,
  // Til Filter
}) => {
  //Filter start: //
  const handleArtistChange = (value) => {
    setSelectedArtist(value);
  };

  const handleLocationChange = (value) => {
    setSelectedLocation(value);
  };

  const handleDateChange = (value) => {
    setSelectedDate(value);
  };

  const handleTechniqueChange = (value) => {
    setSelectedTechnique(value);
  };

  //Filter End: //

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
      <aside>
        <Filter
          // data
          dates={eventsDates}
          eventsLocations={eventsLocations}
          dataTechniques={dataTechniques}
          dataArtists={dataArtists}
          // To try
          selectedTechnique={selectedTechnique}
          setSelectedTechnique={setSelectedTechnique}
          selectedArtist={selectedArtist}
          setSelectedArtist={setSelectedArtist}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          handleArtistChange={handleArtistChange}
          handleLocationChange={handleLocationChange}
          handleDateChange={handleDateChange}
          handleTechniqueChange={handleTechniqueChange}
        ></Filter>
      </aside>
      {images.map((dataSmk) => {
        // Brug 'images' arrayet
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

// return (
//   <div
//     key={dataSmk.id}
//     className={`relative cursor-pointer border-2 p-2 ${
//       isSeledted ? "border-red-100" : "border-gray-100"
//     } ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
//   >
//     {smkdata.smk.map((dataSmk) => {
//       return (
//         <Image
//           key={dataSmk.id}
//           src={dataSmk.image_thumbnail}
//           width={150}
//           height={150}
//           alt="ild"
//         />
//       );
//     })}
//   </div>
// );
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
// };

export default Gallery;
