"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Filter = ({
  dates = [],
  locations = [],
  setSelectedLocation,
  setSelectedDate,
  selectedLocation,
  selectedDate,
}) => {
  const handleLocationChange = (value) => {
    setSelectedLocation(value === "all" ? "" : value);
  };

  const handleDateChange = (value) => {
    setSelectedDate(value === "all" ? "" : value);
  };

  return (
    <div className="flex flex-col gap-4 mb-8">
      <Select
        onValueChange={handleLocationChange}
        value={selectedLocation || "all"}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Vælg lokation" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Lokationer</SelectLabel>
            <SelectItem value="all">Alle lokationer</SelectItem>
            {locations.map((location) => {
              const id = location?.id?.trim();
              if (!id) return null;
              return (
                <SelectItem key={id} value={id}>
                  {location.name || "Ukendt lokation"}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select onValueChange={handleDateChange} value={selectedDate || "all"}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Vælg dato" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Datoer</SelectLabel>
            <SelectItem value="all">Alle datoer</SelectItem>
            {dates.map((date) => {
              const trimmed = date?.trim();
              if (!trimmed) return null;
              return (
                <SelectItem key={trimmed} value={trimmed}>
                  {trimmed}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Filter;
