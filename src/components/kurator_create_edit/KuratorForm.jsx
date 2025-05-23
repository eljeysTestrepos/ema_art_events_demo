"use client";
import Step from "@/components/kurator_create_edit/Step";
import { useForm } from "react-hook-form";
import { getEventDates } from "@/lib/api";
import { useEffect, useState } from "react";

export default function () {
  const [dates, setDates] = useState([]);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const getDatesAndLocations = async () => {
      const dateRes = await fetch("http://localhost:8080/dates");
      if (dateRes.ok) {
        const getDates = await dateRes.json();
        setDates(getDates);
      }
      const locationsRes = await fetch("http://localhost:8080/locations");
      if (locationsRes.ok) {
        const getLocations = await locationsRes.json();
        setLocations(getLocations);
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
  // console.log(getEventDates());

  return (
    <main>
      <section>
        <Step number="1" text="Dato og tid for event" />
        <div className="grid grid-cols-2 grid-rows-2">
          <form onSubmit={handleSubmit(onSubmit)} className="mt-12 flex gap-4">
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

            <select
              name="lokation"
              id="2"
              className="border-2 border-black py-2 px-4"
              {...register("lokation", {
                required: "Du mangler at vælge en lokation*",
              })}
            >
              <option value="">lokation</option>
              {locations.map((location) => (
                <option value="text" key={location}>
                  {location}
                </option>
              ))}
            </select>

            <button type="submit" className="cursor-pointer">
              confirm
            </button>
          </form>
          <div className="grid grid-cols-2 row-start-2">
            <span className="text-red-600">{errors.dato?.message}</span>
            <span className="text-red-600">{errors.lokation?.message}</span>
          </div>
        </div>
      </section>
      <aside></aside>
    </main>
  );
}
