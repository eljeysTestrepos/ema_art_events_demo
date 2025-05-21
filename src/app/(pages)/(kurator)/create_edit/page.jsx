"use client";
import Step from "@/components/kurator_create_edit/Step";
import { useForm } from "react-hook-form";
export default function Create_Edit() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);
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
              <option value="number">2/1 2025</option>
              <option value="number">7/1 2025</option>
              <option value="number">22/1 2025</option>
              <option value="number">1/2 2025</option>
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
              <option value="text">æblehaven 23 Nørrebro</option>
              <option value="text">solskinshaven 32 København S</option>
              <option value="text">papir øen 23 amager</option>
              <option value="text">SMK gyldendalsvej østerbrobro</option>
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
