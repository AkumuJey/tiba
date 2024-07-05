"use client";

import { CalendarToday } from "@mui/icons-material";
import debounce from "debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const DateRangePicker = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [startDate, setStartDate] = useState<string>(
    searchParams.get("start") || ""
  );
  const [endDate, setEndDate] = useState<string>(searchParams.get("end") || "");

  const handleDateChange = (start: string, end: string) => {
    const params = new URLSearchParams(searchParams);
    if (start) {
      params.set("start", start);
    } else {
      params.delete("start");
    }
    if (end) {
      params.set("end", end);
    } else {
      params.delete("end");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="space-y-4">
      <div className="flex space-x-4">
        <div className="relative flex flex-1 flex-shrink-0 bg-transparent">
          <label htmlFor="start-date" className="sr-only">
            Start Date
          </label>
          <input
            type="date"
            id="start-date"
            className="block w-full rounded-md border border-gray-200 py-[9px] px-3 text-sm outline-1 placeholder:text-gray-500"
            value={startDate}
            onChange={(e) => {
              setStartDate(e.target.value);
              handleDateChange(e.target.value, endDate);
            }}
          />
        </div>

        <div className="relative flex flex-1 flex-shrink-0 bg-transparent">
          <label htmlFor="end-date" className="sr-only">
            End Date
          </label>
          <input
            type="date"
            id="end-date"
            className="block w-full rounded-md border border-gray-200 py-[9px] px-3 text-sm outline-1 placeholder:text-gray-500"
            value={endDate}
            onChange={(e) => {
              setEndDate(e.target.value);
              handleDateChange(startDate, e.target.value);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default DateRangePicker;
