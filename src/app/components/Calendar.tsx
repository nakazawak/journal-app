"use client";

import { DayPicker, getDefaultClassNames } from "react-day-picker";
import { useState } from "react";
import "react-day-picker/style.css";

export default function MyDatePicker() {
  const [selected, setSelected] = useState<Date>();
  const defaultClassNames = getDefaultClassNames();


  return (
    <DayPicker
      animate
      mode="single"
      selected={selected}
      onSelect={setSelected}
      footer={
        selected ? `Selected: ${selected.toLocaleDateString()}` : "Pick a day."
      }
      classNames={{
        root: `${defaultClassNames.root} shadow-lg p-5` // Add a shadow to the root element
      }}
    />
  );
}