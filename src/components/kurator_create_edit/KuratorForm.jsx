"use client";

import {
  useState,
  useEffect,
  useCallback,
  useActionState,
  startTransition,
} from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { createEvent, updateEvent } from "@/lib/api";

import KuratorGallery from "@/components/kurator_create_edit/KuratorGallery";
import CustomButton from "@/components/global/CustomButton";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Filter from "../global/filter/Filter";
import { filterData } from "../global/filter/actions";

const KuratorForm = ({
  initialEventData,
  smk,
  maxImages,
  locations,
  eventDates,
  filterCategories,
}) => {
  //Filter start
  const [state, action, isPending] = useActionState(filterData, {
    active: [],
    data: [],
  });

  function handleFilter(value, category) {
    const replaceFilter = state?.active?.filter(
      (item) => !item.includes(category)
    );
    const data =
      value === "all"
        ? replaceFilter
        : [...replaceFilter, `[${category}:${value}]`];

    startTransition(action.bind(state, data));
  }
  //Filter end

  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: initialEventData || {
      title: "",
      locationId: "",
      date: "",
      description: "",
      artworkIds: [],
    },
  });

  const selectedLocationId = watch("locationId");
  const artworkIdsFromForm = watch("artworkIds");

  const [selectedImages, setSelectedImages] = useState(
    initialEventData?.artworkIds || []
  );

  const [currentMaxImages, setCurrentMaxImages] = useState(
    Number(maxImages) || 0
  );

  const [selectedLocation, setSelectedLocation] = useState(null);

  const [selectedDate, setSelectedDate] = useState(null);

  const [allowedDates, setAllowedDates] = useState([]);

  useEffect(() => {}, [
    maxImages,
    currentMaxImages,
    selectedLocationId,
    locations,
    eventDates,
  ]);

  useEffect(() => {
    if (Array.isArray(eventDates) && eventDates.length > 0) {
      const parsedDates = eventDates.map((dateStr) => {
        const [year, month, day] = dateStr.split("-").map(Number);
        return new Date(year, month - 1, day);
      });
      setAllowedDates(parsedDates);
    } else {
      setAllowedDates([]);
    }
  }, [eventDates]);

  useEffect(() => {
    if (initialEventData) {
      console.log(
        "KURATORFORM DEBUG: initialEventData.artworkIds:",
        initialEventData.artworkIds
      );

      for (const [key, value] of Object.entries(initialEventData)) {
        if (key !== "time") {
          setValue(key, value);
        }
      }
      setSelectedImages(initialEventData.artworkIds || []);
      if (initialEventData.date) {
        const [year, month, day] = initialEventData.date.split("-").map(Number);
        setSelectedDate(new Date(year, month - 1, day));
      }
    }
  }, [initialEventData, setValue]);

  useEffect(() => {
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split("T")[0];
      setValue("date", formattedDate);
    } else {
      setValue("date", "");
    }
  }, [selectedDate, setValue]);

  useEffect(() => {
    if (!Array.isArray(locations)) {
      console.warn("KuratorForm: 'locations' prop is not an array.", locations);
      setSelectedLocation(null);
      setCurrentMaxImages(0);
      return;
    }

    const foundLocation = locations.find(
      (loc) => String(loc.id) === String(selectedLocationId)
    );

    setSelectedLocation(foundLocation || null);

    const newMaxImages = Number(foundLocation?.maxArtworks) || 0;
    setCurrentMaxImages(newMaxImages);

    if (foundLocation && selectedImages.length > newMaxImages) {
      const trimmedImages = selectedImages.slice(0, newMaxImages);
      setSelectedImages(trimmedImages);
      setValue("artworkIds", trimmedImages);
    } else if (foundLocation && newMaxImages === 0) {
      setSelectedImages([]);
      setValue("artworkIds", []);
    }
  }, [selectedLocationId, setValue, selectedImages, locations]);

  useEffect(() => {
    if (JSON.stringify(selectedImages) !== JSON.stringify(artworkIdsFromForm)) {
      setValue("artworkIds", selectedImages);
    }
  }, [selectedImages, artworkIdsFromForm, setValue]);

  const handleImageSelect = useCallback(
    (imageId) => {
      console.log("handleImageSelect called for imageId:", imageId);
      console.log("handleImageSelect: currentMaxImages =", currentMaxImages);
      console.log(
        "handleImageSelect: selectedImages.length =",
        selectedImages.length
      );
      console.log("handleImageSelect: selectedLocation =", selectedLocation);

      if (!selectedLocation || currentMaxImages === 0) {
        alert(
          "Vælg venligst en lokation med billedkapacitet for at vælge billeder."
        );
        return;
      }

      const isSelected = selectedImages.includes(imageId);

      let updatedSelectedImages;
      if (isSelected) {
        updatedSelectedImages = selectedImages.filter((id) => id !== imageId);
      } else {
        if (selectedImages.length < currentMaxImages) {
          updatedSelectedImages = [...selectedImages, imageId];
        } else {
          alert(
            `Du kan kun vælge op til ${currentMaxImages} billeder for denne lokation.`
          );
          return;
        }
      }
      setSelectedImages(updatedSelectedImages);
    },
    [selectedImages, currentMaxImages, selectedLocation]
  );

  const filterAllowedDates = (date) => {
    return allowedDates.some(
      (allowedDate) => allowedDate.toDateString() === date.toDateString()
    );
  };

  const onSubmit = async (data) => {
    const { time, ...dataToSubmit } = data;

    dataToSubmit.artworkIds =
      dataToSubmit.artworkIds?.filter(
        (id) => id !== null && id !== undefined && id !== ""
      ) || [];

    console.log(
      "FRONTEND LOG: Data being sent to createEvent/updateEvent:",
      dataToSubmit
    );
    try {
      if (initialEventData && initialEventData.id) {
        console.log("Attempting to update event with ID:", initialEventData.id);
        console.log("Data to submit for update:", dataToSubmit);
        await updateEvent(initialEventData.id, dataToSubmit);
        console.log("Event updated successfully!");
      } else {
        console.log("Attempting to create new event with data:", dataToSubmit);
        await createEvent(dataToSubmit);
        console.log("Event created successfully!");
      }
      router.push("/dashboard");
    } catch (error) {
      console.error("Error submitting form:", error);

      if (
        error.message &&
        error.message.includes("Another event already exists")
      ) {
        alert(
          "Fejl: Et andet event findes allerede på denne dato og lokation. Vælg en anden kombination."
        );
      } else if (
        error.message &&
        error.message.includes("location not found")
      ) {
        alert(
          "Fejl: Den valgte lokation kunne ikke findes. Venligst tjek lokationsvalget."
        );
      } else {
        alert(
          "Der opstod en fejl ved gemning af eventet. Tjek venligst alle felter."
        );
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-4">
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
          })}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        >
          <option value="">Vælg en lokation</option>
          {Array.isArray(locations) && locations.length > 0 ? (
            locations.map((loc) => (
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

        <DatePicker
          id="date"
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="dd/MM/yyyy"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          filterDate={filterAllowedDates}
          placeholderText="Vælg en dato"
          isClearable
        />

        <input
          type="hidden"
          {...register("date", { required: "Dato er påkrævet" })}
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
      <Filter
        filterCategories={filterCategories}
        action={handleFilter}
      ></Filter>
      <div className="border p-4 rounded-md">
        <KuratorGallery
          // Filter start
          {...state}
          // Filter End
          smkdata={smk}
          selectedImages={selectedImages}
          handleImageSelect={handleImageSelect}
          maxImages={currentMaxImages}
          locationSelected={!!selectedLocation}
          showSelectedImagesSection={false}
        />
        <input type="hidden" {...register("artworkIds")} />
      </div>

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
