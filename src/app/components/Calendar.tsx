"use client";

import { DayPicker, getDefaultClassNames } from "react-day-picker";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import "react-day-picker/style.css";

//passes in prop function from Parent
interface MyDatePickerProps {
  onDateSelect: (date: Date | undefined) => void;
}

export default function MyDatePicker({onDateSelect,}: MyDatePickerProps) {
  const [selected, setSelected] = useState<Date>();
  const defaultClassNames = getDefaultClassNames();
  const router = useRouter();

    //updates local state of selected date and calls function from Parent
  function handleSelect(date: Date | undefined) {
    setSelected(date);
    // Notify the parent that a date was selected
    // The parent decides what to do with it
    onDateSelect(date);
  }



  return (
    <DayPicker
      animate
      mode="single"
      selected={selected}
      onSelect={handleSelect}
      footer={
        selected ? `Selected: ${selected.toLocaleDateString()}` : "Pick a day."
      }
      classNames={{
        root: `${defaultClassNames.root} shadow-lg p-5` // Add a shadow to the root element
      }}
    />
  );
}