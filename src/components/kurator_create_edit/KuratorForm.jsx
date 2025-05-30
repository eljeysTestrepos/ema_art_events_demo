"use client";
import Step from "@/components/kurator_create_edit/Step";
import { useForm } from "react-hook-form";
import { useEffect, useState, useCallback } from "react";
import Gallery from "./Gallery";
import { useRouter } from "next/navigation";

const KuratorForm = ({ smk, initialEventData }) => {
  console.log("Initial Event Data received in KuratorForm:", initialEventData); // Behold denne til at verificere

  const [dates, setDates] = useState([]);
  const [locations, setLocations] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false); // Ny state til at spore dataindlæsning

  const [selectedImages, setSelectedImages] = useState([]);
  const [maxImages, setMaxImages] = useState(0);

  const router = useRouter();

  // Definer standardværdier for formularen.
  const defaultFormValues = {
    date: initialEventData?.date || "",
    locationId: initialEventData?.locationId || "",
    title: initialEventData?.title || "",
    description: initialEventData?.description || "",
    artworksId: initialEventData?.artworkIds || [],
  };

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset, // Vigtigt: Brug reset her
    formState: { errors },
  } = useForm({
    defaultValues: defaultFormValues, // Sæt defaultValues, men vi vil også bruge reset
  });

  const selectedLocationId = watch("locationId");
  const selectedDate = watch("date");

  // Effekt 1: Henter datoer og lokationer én gang ved mount.
  useEffect(() => {
    const getDatesAndLocations = async () => {
      try {
        const dateRes = await fetch("http://localhost:8080/dates");
        const getDates = dateRes.ok ? await dateRes.json() : [];
        setDates(getDates);
        if (!dateRes.ok)
          console.error("Failed to fetch dates:", dateRes.statusText);

        const locationsRes = await fetch("http://localhost:8080/locations");
        const getLocations = locationsRes.ok ? await locationsRes.json() : [];
        setLocations(getLocations);
        if (!locationsRes.ok)
          console.error("Failed to fetch locations:", locationsRes.statusText);

        setDataLoaded(true); // Marker at datoer og lokationer er indlæst
      } catch (error) {
        console.error("Error fetching dates or locations:", error);
      }
    };

    getDatesAndLocations();
  }, []);

  // Effekt 2: Brug `reset` til at sætte formværdier, når initial data og lister er klar.
  // Dette tvinger react-hook-form til at opdatere UI'en, når `<option>` elementerne er renderet.
  useEffect(() => {
    if (dataLoaded && initialEventData) {
      // Kør kun når dynamisk data er indlæst og initialEventData er tilgængelig
      console.log("DEBUG: Resetting form with initialEventData values...");

      // Brug reset med de samme default værdier, som vi definerede
      reset({
        date: initialEventData.date || "",
        locationId: initialEventData.locationId || "",
        title: initialEventData.title || "",
        description: initialEventData.description || "",
        artworksId: initialEventData.artworkIds || [],
      });

      // Sæt også selectedImages state her, hvis den ikke er blevet sat af defaultValues
      if (initialEventData.artworkIds) {
        setSelectedImages(initialEventData.artworkIds);
      }
    }
  }, [dataLoaded, initialEventData, reset]); // Afhængigheder for denne effekt

  // Effekt 3: Opdaterer maxImages og `selectedImages` baseret på valgt lokation.
  useEffect(() => {
    let currentCapacity = 0;
    if (selectedLocationId && locations.length > 0) {
      const chosenLocation = locations.find(
        (loc) => String(loc.id) === String(selectedLocationId) // Brug String() for at sikre sammenligningstypen
      );
      if (chosenLocation) {
        currentCapacity = chosenLocation.maxArtworks || 3;
      }
    }
    setMaxImages(currentCapacity);

    // Hvis ingen lokation er valgt (eller den ikke findes), ryd billeder
    if (!selectedLocationId) {
      setSelectedImages([]);
      setValue("artworksId", []); // Ryd også formens værdi
    } else {
      // Juster selectedImages baseret på den nye kapacitet, kun hvis den aktuelle udvælgelse overstiger
      const currentFormArtworkIds = watch("artworksId") || [];
      if (currentFormArtworkIds.length > currentCapacity) {
        const trimmedImages = currentFormArtworkIds.slice(0, currentCapacity);
        setSelectedImages(trimmedImages);
        setValue("artworksId", trimmedImages);
      } else {
        // Sørg for at selectedImages state er synkroniseret med formens værdi, hvis den er gyldig
        if (
          JSON.stringify(selectedImages) !==
          JSON.stringify(currentFormArtworkIds)
        ) {
          setSelectedImages(currentFormArtworkIds);
        }
      }
    }
  }, [selectedLocationId, locations, setValue, watch, initialEventData, reset]); // Inkluder reset og initialEventData for robusthed

  // Bruger useCallback for at stabilisere `handleImageSelect` funktionen
  const handleImageSelect = useCallback(
    (imageId) => {
      const isSelected = selectedImages.includes(imageId);

      let updatedSelectedImages;
      if (isSelected) {
        updatedSelectedImages = selectedImages.filter((id) => id !== imageId);
      } else {
        if (selectedImages.length < maxImages) {
          updatedSelectedImages = [...selectedImages, imageId];
        } else {
          alert(
            `Du kan kun vælge op til ${maxImages} billeder for denne lokation`
          );
          return;
        }
      }
      setSelectedImages(updatedSelectedImages);
      setValue("artworksId", updatedSelectedImages);
    },
    [selectedImages, maxImages, setValue]
  );

  const onSubmit = async (data) => {
    const eventId = initialEventData?.id;
    const method = eventId ? "PATCH" : "POST";
    const url = eventId
      ? `http://localhost:8080/events/${eventId}`
      : "http://localhost:8080/events";

    const payload = {
      ...data,
      artworkIds: selectedImages,
    };

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      let responseBody;
      try {
        responseBody = await response.json();
      } catch (jsonError) {
        responseBody = await response.text();
        console.warn("Server response er ikke JSON:", responseBody);
      }

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

      console.log(
        `Event blev ${eventId ? "opdateret" : "oprettet"} korrekt:`,
        responseBody
      );
      alert(`Event succesfuldt ${eventId ? "opdateret" : "gemt"}!`);
      reset(); // Nulstil formularen efter succesfuld indsendelse
      setSelectedImages([]); // Ryd valgte billeder

      router.push("/dashboard");
      router.refresh(); // Genindlæs data på dashboardet for at vise ændringerne
    } catch (error) {
      console.error("Netværksfejl eller uventet fejl:", error);
      alert("Der skete en uventet fejl ved sending af data.");
    }
  };

  // Vigtigt: Betinget rendering af select-felterne
  // De renderes kun, når `dates` og `locations` er indlæst.
  if (!dataLoaded) {
    return <p>Loading form data...</p>; // Eller en spinner
  }

  return (
    <main>
      <section className="border-2 border-black px-4 py-4">
        <Step number="1" text="Dato og tid for event" />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex my-12 gap-4">
            <select
              name="date"
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
              name="locationId"
              id="locationId"
              className="border-2 border-black py-2 px-4"
              {...register("locationId", {
                required: "Du mangler at vælge en lokation*",
              })}
            >
              <option value="">lokation</option>
              {locations.map((location) => (
                <option value={location.id} key={location.id}>
                  {location.id}-{location.name}-{location.address}
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
              locationSelected={!!selectedLocationId && locations.length > 0}
            />
          </div>
          {/*----------------------------*/}
          <Step number="3" text="tekstindhold" />
          <div className="my-12 flex gap-4">
            <div className="flex flex-col">
              <label htmlFor="title" className="mb-2">
                {" "}
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
              <label htmlFor="description" className="mb-2">
                {" "}
                Event description
              </label>
              <textarea
                name="description"
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
