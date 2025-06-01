"use client";

import { Select } from "../../ui/select";
import FilterDropDown from "./FilterDropdown";

const Filter = ({ filterCategories, action }) => {
  console.log("Filter: ", filterCategories);
  return (
    <section>
      <div className="flex  gap-4 mb-8">
        {filterCategories.map((item, id) => {
          return <FilterDropDown key={id} {...item} action={action} />;
        })}
      </div>
    </section>
  );
};

export default Filter;
