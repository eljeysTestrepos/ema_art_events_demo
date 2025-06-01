"use client";

import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { createEvent, updateEvent } from "@/lib/api";

import KuratorGallery from "./KuratorGallery";
import CustomButton from "@/components/global/CustomButton";
import Step from "./Step";

const KuratorForm = ({
  initialEventData,
  smk,
  eventsDates,
  eventsLocations,
  // Til Filter
  filterCategories,
}) => {
  const router = useRouter();
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
  } = useForm();

  //kigger på lokationdropdown.
  const selectedLocationId = watch("locationId"); //før lokation

  useEffect(() => {
    const getDatesAndLocations = async () => {
      const dateRes = await fetch(
        "https://ema-async-exhibit-server.onrender.com/dates"
      );
      if (dateRes.ok) {
        const getDates = await dateRes.json();
        setDates(getDates);
        // console.log("Dette er dates: ", getDates);
      }
      const locationsRes = await fetch(
        "https://ema-async-exhibit-server.onrender.com/locations"
      );
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

  // her postest event objektet til serveren
  const onSubmit = async (data) => {
    try {
      const postData = await fetch("http://localhost:8080/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      //indholdstjek. sender serveren den rigtig Json
      let responseBody;
      try {
        responseBody = await postData.json();
      } catch (jsonError) {
        responseBody = await postData.text();
        console.warn("server response er ikke JSON");
      }

      //fejl håndtering
      if (!postData.ok) {
        console.error(
          "Fejl ved sending af eventdata:",
          responseBody || postData.statusText
        );
        alert(
          `Fejl: ${
            responseBody?.message || responseBody || postData.statusText
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

  //------------------------------------------------------- Rrturn -------------------------------------------------//
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-4">
      <Step number="1" text="Dato og tid for event" />
      <h1 className="text-2xl font-bold mb-4">
        {initialEventData ? "Rediger event" : "Opret nyt event"}
      </h1>
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Titel:
        </label>
        <input
          type="text"
          id="title"
          {...register("title", { required: "Titel er påkrævet" })}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="locationId"
          className="block text-sm font-medium text-gray-700"
        >
          Lokation:
        </label>
        <select
          id="locationId"
          {...register("locationId", {
            required: "Lokation er påkrævet",
            valueAsNumber: true,
          })}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        >
          <option value="">Vælg en lokation</option>
          {Array.isArray(eventsLocations) && eventsLocations.length > 0 ? (
            eventsLocations.map((loc) => (
              <option key={loc.id} value={loc.id}>
                {loc.name} (Max billeder: {loc.maxArtworks})
              </option>
            ))
          ) : (
            <option disabled>Indlæser lokationer eller ingen fundet...</option>
          )}
        </select>
        {errors.locationId && (
          <p className="mt-1 text-sm text-red-600">
            {errors.locationId.message}
          </p>
        )}
      </div>
      <div>
        <label
          htmlFor="date"
          className="block text-sm font-medium text-gray-700"
        >
          Dato:
        </label>
        <input
          type="date"
          id="date"
          {...register("date", { required: "Dato er påkrævet" })}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
        {errors.date && (
          <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Beskrivelse:
        </label>
        <textarea
          id="description"
          {...register("description")}
          rows="4"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        ></textarea>
      </div>

      <Step number="2" text="Vælg billeder fra galleriet">
        <KuratorGallery
          smkdata={smk}
          selectedImages={selectedImages}
          handleImageSelect={handleImageSelect}
          maxImages={maxImages}
          locationSelected={!!selectedLocationId}
          showSelectedImagesSection={false}
          categories={filterCategories}
        >
          <input type="hidden" {...register("artworksId")} />
        </KuratorGallery>
      </Step>
      <CustomButton
        type="submit"
        text={initialEventData ? "Gem ændringer" : "Opret event"}
        className="mt-6 w-fit"
        variant="default"
        size="lg"
      />
    </form>
  );
};

export default KuratorForm;
