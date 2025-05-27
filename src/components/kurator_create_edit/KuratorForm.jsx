"use client";
import Step from "@/components/kurator_create_edit/Step";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { getEventLocations, getEventDates } from "@/lib/api";
import Button from "../global/Button";
import Gallery from "./Gallery";

const KuratorForm = (SMKItems) => {
  const [dates, setDates] = useState([]);
  const [locations, setLocations] = useState([]);
  console.log("data 2: ", SMKItems);
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
        // console.log("Dette er lokation:", getLocations);
      }
    };
    getDatesAndLocations();
  }, []);

  //react-hook-forms
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);
  // console.log(getEventLocations());

  return (
    <main>
      <section className="border-2 border-black px-4 py-4">
        <Step number="1" text="Dato og tid for event" />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex my-12 gap-4">
            <select
              name="dato"
              id="dato"
              className="border-2 border-black py-2 px-4"
              {...register("dato", {
                required: "Du mangler at vælge en dato*",
              })}
            >
              <option value="">dato</option>
              {dates.map((date) => (
                <option value="number" key={date}>
                  {date}
                </option>
              ))}
            </select>
            {/*----------------------------*/}

            <select
              name="lokation"
              id="lokation"
              className="border-2 border-black py-2 px-4"
              {...register("lokation", {
                required: "Du mangler at vælge en lokation*",
              })}
            >
              <option value="">lokation</option>
              {locations.map((location) => (
                <option value="text" key={location.id}>
                  {location.id}-{location.name}-{location.address}
                </option>
              ))}
            </select>
          </div>
          {/*----------------------------*/}
          <div className="grid grid-cols-2 row-start-2">
            <span className="text-red-600">{errors.dato?.message}</span>
            <span className="text-red-600">{errors.lokation?.message}</span>
          </div>
          {/*----------------------------*/}
          <Step number="2" text="Billeder" />
          <div className="mb-32">
            {/*billed section*/}
            <Gallery {...SMKItems} />
            {/*billed section*/}
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
                id="beskrivelse"
                placeholder="event beskrivelse"
                className=" border-black border-2 py-2 px-4"
                {...register("beskrivelse", {
                  required: "Du mangler at navngive eventet*",
                })}
              ></textarea>
              <span className="text-red-600">
                {errors.beskrivelse?.message}
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
