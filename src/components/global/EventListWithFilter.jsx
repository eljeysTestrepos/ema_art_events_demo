"use client";

import React, { useState } from "react";
import EventItem from "@/components/global/EventItem";
import Filter from "@/components/global/Filter";

const EventListWithFilter = ({
  initialEvents,
  availableDates,
  availableLocations,
}) => {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const [filteredEvents, setFilteredEvents] = useState(initialEvents);

  const applyFilters = (location, date) => {
    let currentFilteredEvents = initialEvents;

    if (location) {
      currentFilteredEvents = currentFilteredEvents.filter(
        (event) => event.location?.id === location
      );
    }

    if (date) {
      currentFilteredEvents = currentFilteredEvents.filter(
        (event) => event.date === date
      );
    }

    setFilteredEvents(currentFilteredEvents);
  };

  const handleLocationChange = (value) => {
    const newLocation = String(value || "").trim();
    setSelectedLocation(newLocation);

    applyFilters(newLocation, selectedDate);
  };

  const handleDateChange = (value) => {
    const newDate = String(value || "").trim();
    setSelectedDate(newDate);

    applyFilters(selectedLocation, newDate);
  };

  return (
    <div className="flex">
      <section className="pr-(--space-3rem) flex-grow">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((dataevent) => (
            <EventItem key={dataevent.id} {...dataevent} />
          ))
        ) : (
          <p>Ingen events matcher dine filtre.</p>
        )}
      </section>
      <aside>
        <Filter
          dates={availableDates}
          locations={availableLocations}
          setSelectedLocation={handleLocationChange}
          setSelectedDate={handleDateChange}
          selectedLocation={selectedLocation}
          selectedDate={selectedDate}
        />
      </aside>
    </div>
  );
};

export default EventListWithFilter;
