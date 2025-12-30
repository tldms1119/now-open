"use client";

import { PlusCircleIcon, TrashIcon } from "@heroicons/react/24/outline";
import Input from "@/components/form-input";
import Select from "@/components/form-select";

const days = [
  { value: "0", label: "Sunday" },
  { value: "1", label: "Monday" },
  { value: "2", label: "Tuesday" },
  { value: "3", label: "Wednesday" },
  { value: "4", label: "Thursday" },
  { value: "5", label: "Friday" },
  { value: "6", label: "Saturday" },
];

export interface BusinessHourContent {
  dayOfWeek: string;
  openTime: string;
  closeTime: string;
}

interface BusinessHoursFieldProps {
  businessHours: BusinessHourContent[];
  onChange: (businessHours: BusinessHourContent[]) => void;
}

export default function BusinessHoursField({
  businessHours,
  onChange,
}: BusinessHoursFieldProps) {
  const handleAddBusinessHour = () => {
    onChange([
      ...businessHours,
      { dayOfWeek: "0", openTime: "09:00", closeTime: "16:00" },
    ]);
  };

  const handleChangeBusinessHour = (
    index: number,
    field: string,
    value: string
  ) => {
    const updated = businessHours.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    onChange(updated);
  };

  const handleRemoveBusinessHour = (index: number) => {
    onChange(businessHours.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="font-medium">Business Hours</label>
      {businessHours.map((item, idx) => (
        <div key={idx} className="flex gap-3 items-center">
          <Select
            name="dayOfWeek"
            value={item.dayOfWeek}
            onChange={(e) =>
              handleChangeBusinessHour(idx, "dayOfWeek", e.target.value)
            }
            options={days}
          />
          <Input
            type="time"
            name="openTime"
            value={item.openTime}
            step={1800}
            onChange={(e) =>
              handleChangeBusinessHour(idx, "openTime", e.target.value)
            }
          />
          <span className="text-neutral-500">~</span>
          <Input
            type="time"
            name="closeTime"
            value={item.closeTime}
            onChange={(e) =>
              handleChangeBusinessHour(idx, "closeTime", e.target.value)
            }
          />
          <TrashIcon
            className="w-6 h-6 text-red-500 cursor-pointer"
            onClick={() => handleRemoveBusinessHour(idx)}
          />
        </div>
      ))}
      <PlusCircleIcon
        className="w-9 h-9 text-blue-400 hover:text-blue-300 cursor-pointer mx-auto"
        onClick={handleAddBusinessHour}
      />
    </div>
  );
}
