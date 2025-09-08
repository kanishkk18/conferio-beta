"use client";

import React from "react";
import DatePicker from "react-datepicker";
import dayjs, { Dayjs } from "dayjs";
import "react-datepicker/dist/react-datepicker.css";
// import "./custom-datepicker.css"; // Optional: for custom styles

interface DateTimePickerProps {
  date: Dayjs | null;
  setDate: (value: Dayjs | null) => void;
}

export default function DateTime_Picker({
  date,
  setDate,
}: DateTimePickerProps) {
  const handleChange = (selectedDate: Date | null) => {
    setDate(selectedDate ? dayjs(selectedDate) : null);
  };

  return (
    <div className=" p-2 rounded-sm min-w-[305px]">
      <DatePicker
        selected={date?.toDate() || null}
        onChange={handleChange}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        dateFormat="MMMM d, yyyy h:mm aa"
        className="w-full border px-3 py-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        calendarClassName=""
        placeholderText="Select date and time"
      />
    </div>
  );
}
