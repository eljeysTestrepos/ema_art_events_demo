"use client";
import Step from "@/components/kurator_create_edit/Step";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Gallery from "./Gallery";

const KuratorForm = ({ smk, initialData, eventId }) => {
  // const EventsDates = await getEventDates();
  const [dates, setDates] = useState([]);
  const [locations, setLocations] = useState([]);

  //logik for valg af billeder
  const [selectedImages, setSelectedImages] = useState([]);
  const [maxImages, setMaxImages] = useState(0);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: initialData || {},
  });

  //kigger på lokationdropdown.
  const selectedLocationId = watch("locationId"); //før lokation
  //Her "genskabes" de valgte informationer i formen som tilhører det valgte Event
  useEffect(() => {
    // console.log("kuratorForm - initialData modtaget: ", initialData);
    // console.log("kuratorForm - eventId modtaget: ", eventId);
    if (initialData?.artworksId) {
      setSelectedImages(initialData.artworksId);
      setValue("artworksId", initialData.artworksId);
    }
    if (initialData?.location?.id) {
      setValue("locationId", initialData.location.id);
    }
  }, [initialData, setValue]);

  //Henter dato og lokation fra server api.
  useEffect(() => {
    const getDatesAndLocations = async () => {
      const dateRes = await fetch("http://localhost:8080/dates");
      if (dateRes.ok) {
        const getDates = await dateRes.json();
        setDates(getDates);
        // console.log("Dette er dates: ", getDates);
      }
      const locationsRes = await fetch("http://localhost:8080/locations");
      if (locationsRes.ok) {
        const getLocations = await locationsRes.json();
        setLocations(getLocations);
      }
    };

    getDatesAndLocations();
  }, []);

  //kigger på hvilke ændringer der sker når man vælger lokation.
  useEffect(() => {
    let currentCapacity = 0;
    if (selectedLocationId) {
      const chosenLocation = locations.find(
        (loc) => loc.id === selectedLocationId
      );
      if (chosenLocation) {
        const capacity = chosenLocation.maxArtworks || 3;
        setMaxImages(capacity);
      }
    } else {
      setMaxImages(0);
    }
    const currentFormImages = watch("artworksId") || [];
    if (currentFormImages.length > currentCapacity) {
      setSelectedImages([]);
      setValue("artworksId", []);
    } else if (!selectedLocationId) {
      setSelectedImages([]);
      setValue("artworksId", []);
    }
  }, [selectedLocationId, locations, setValue, watch]);

  const handleImageSelect = (imageId) => {
    const isSelected = selectedImages.includes(imageId);

    let updatedSelectedImages;
    if (isSelected) {
      updatedSelectedImages = selectedImages.filter((id) => id !== imageId);
    } else {
      if (selectedImages.length < maxImages) {
        updatedSelectedImages = [...selectedImages, imageId];
      } else {
        alert(
          `Du kan kun vælger op til ${maxImages} billeder for denne lokation`
        );
        return;
      }
    }
    setSelectedImages(updatedSelectedImages);
    setValue("artworksId", updatedSelectedImages);
  };

  // her postest event objektet til serveren & patches objekter.
  const onSubmit = async (data) => {
    //findes eventid eller ej
    const method = eventId ? "PATCH" : "POST";
    const url = eventId
      ? `http://localhost:8080/events/${eventId}`
      : "http://localhost:8080/events";

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      let responseBody;
      try {
        let responseBody = await response.json();
      } catch (jsonError) {
        responseBody = await response.text();
        console.warn("server response er ikke JSON");
      }
      //fejl håndtering
      if (!response.ok) {
        console.error(
          "Fejl ved sending af eventdata:",
          responseBody || response.statusText
        );
        alert(
          `Fejl: ${
            responseBody?.message || responseBody || response.statusText
          }`
        );
        return;
      }
      //succes med at skabe et event
      console.log("Event blev oprettet/opdateret korrekt:", responseBody);
      alert("Event succesfuldt gemt!");
      //lav en fuld reset af formen
      reset();
    } catch (error) {
      //håndtering af netværksfejl og andre uforudsete fejl
      console.error("Netværksfejl eller uventet fejl:", error);
      alert("Der skete en uventet fejl ved sending af data.");
    }
  };

  // const onSubmit = (data) => console.log({ ...data, images: selectedImages });

  return (
    <main>
      <section className="border-2 border-black px-4 py-4">
        <Step number="1" text="Dato og tid for event" />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex my-12 gap-4">
            <select
              name="dato"
              id="date"
              className="border-2 border-black py-2 px-4"
              {...register("date", {
                required: "Du mangler at vælge en dato*",
              })}
            >
              <option value="">dato</option>
              {dates.map((date) => (
                <option value={date} key={date}>
                  {date}
                </option>
              ))}
            </select>
            {/*----------------------------*/}

            <select
              name="lokation"
              id="locationId"
              className="border-2 border-black py-2 px-4"
              {...register("locationId", {
                required: "Du mangler at vælge en lokation*",
              })}
            >
              <option value="">lokation</option>
              {locations.map((locationId) => (
                <option value={locationId.id} key={locationId.id}>
                  {locationId.id}-{locationId.name}-{locationId.address}
                </option>
              ))}
            </select>
          </div>
          {/*----------------------------*/}
          <div className="grid grid-cols-2 row-start-2">
            <span className="text-red-600">{errors.date?.message}</span>
            <span className="text-red-600">{errors.locationId?.message}</span>
          </div>
          {/*----------------------------*/}
          <Step number="2" text="Billeder" />
          <div className="mb-32">
            <Gallery
              smkdata={smk}
              selectedImages={selectedImages}
              handleImageSelect={handleImageSelect}
              maxImages={maxImages}
              locationSelected={!!selectedLocationId}
            />
          </div>
          {/*----------------------------*/}
          <Step number="3" text="tekstindhold" />
          <div className="my-12 flex  gap-4">
            <div className="flex flex-col">
              <label htmlFor="text" className="mb-2">
                Event title
              </label>
              <input
                name="title"
                id="title"
                placeholder="event titel"
                className=" border-black border-2 py-2 px-4"
                {...register("title", {
                  required: "Du mangler at navngive eventet*",
                })}
              ></input>
              <span className="text-red-600">{errors.title?.message}</span>
            </div>
            {/*----------------------------*/}
            <div className="flex flex-col">
              <label htmlFor="text" className="mb-2">
                Event title
              </label>
              <textarea
                name="beskrivelse"
                id="description"
                placeholder="event beskrivelse"
                className=" border-black border-2 py-2 px-4"
                {...register("description", {
                  required: "Du mangler at navngive eventet*",
                })}
              ></textarea>
              <span className="text-red-600">
                {errors.description?.message}
              </span>
            </div>
          </div>
          {/*----------------------------*/}
          <div className="flex justify-end">
            <button
              type="submit"
              className="cursor-pointer border-2 border-black py-2 px-4 rounded-[0.5rem]"
            >
              confirm
            </button>
          </div>
        </form>
      </section>
      <aside></aside>
    </main>
  );
};

export default KuratorForm;
