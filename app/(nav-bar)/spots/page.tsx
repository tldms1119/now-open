"use client";

import Button from "@/components/form-button";
import Input from "@/components/form-input";
import GoogleMap from "@/components/google-map";
import { useActionState, useState } from "react";
import { createSpot } from "./action";
import { PlusCircleIcon, TrashIcon } from "@heroicons/react/24/outline";
import Select from "@/components/form-select";

const days = [
  { value: 0, label: "Sunday" },
  { value: 1, label: "Monday" },
  { value: 2, label: "Tuesday" },
  { value: 3, label: "Wednesday" },
  { value: 4, label: "Thursday" },
  { value: 5, label: "Friday" },
  { value: 6, label: "Saturday" },
];

interface BusinessHourContent {
  dayOfWeek: number;
  openTime: string;
  closeTime: string;
}

export default function SpotsPage() {
  const [state, dispatch] = useActionState(createSpot, {
    name: "",
    desc: "",
    longitude: "",
    latitude: "",
    businessHours: [],
    error: {
      fieldErrors: {
        name: [],
        desc: [],
        longitude: [],
        latitude: [],
        businessHours: [],
      },
      formErrors: [],
    },
  });

  const [businessHours, setBusinessHours] = useState(state.businessHours);

  const handleAddBusinessHour = () => {
    setBusinessHours([
      ...businessHours,
      { dayOfWeek: 0, openTime: "", closeTime: "" },
    ]);
  };

  const handleChangeBusinessHour = (
    index: number,
    field: string,
    value: number | string
  ) => {
    const updated = businessHours.map((item: BusinessHourContent, i: number) =>
      i === index ? { ...item, [field]: value } : item
    );
    setBusinessHours(updated);
  };

  const handleRemoveBusinessHour = (index: number) => {
    setBusinessHours(
      businessHours.filter((_: BusinessHourContent, i: number) => i !== index)
    );
  };

  return (
    <>
      <main className="flex flex-1 px-6 py-4 h-max-screen gap-3">
        {/* left */}
        <section className="flex-1 flex flex-col justify-start">
          <h2 className="text-2xl font-semibold mb-2">Add a New Spot</h2>
          <label className="font-medium">Basic Information</label>
          <form
            action={(formData: FormData) => {
              formData.set("businessHours", JSON.stringify(businessHours));
              dispatch(formData);
            }}
            className="flex flex-col gap-3 mt-2"
          >
            <Input
              type="text"
              name="name"
              placeholder="Spot Name"
              required
              errors={state?.error?.fieldErrors.name}
              defaultValue={state?.name}
              minLength={3}
              maxLength={10}
            />
            <Input
              type="text"
              name="desc"
              placeholder="Description"
              errors={state?.error?.fieldErrors.desc}
              defaultValue={state?.desc}
            />
            <Input
              type="text"
              name="longitude"
              placeholder="Longitude (ex: 127.123456)"
              required
              errors={state?.error?.fieldErrors.longitude}
              defaultValue={state?.longitude}
            />
            <Input
              type="text"
              name="latitude"
              placeholder="Latitude (ex: 37.123456)"
              required
              errors={state?.error?.fieldErrors.latitude}
              defaultValue={state?.latitude}
            />

            {/* Business Hours */}
            <div className="flex flex-col gap-2">
              <label className="font-medium">Business Hours</label>
              {businessHours.map((item: BusinessHourContent, idx: number) => (
                <div key={idx} className="flex gap-3 items-center">
                  <Select
                    name="dayOfWeek"
                    value={item.dayOfWeek}
                    onChange={(e) =>
                      handleChangeBusinessHour(
                        idx,
                        "dayOfWeek",
                        Number(e.target.value)
                      )
                    }
                    options={days}
                  />
                  <Input
                    type="time"
                    name="openTime"
                    value={item.openTime}
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
            <Button text="Add Spot" />
          </form>
        </section>
        {/* right */}
        <section className="flex-2 flex items-center justify-center">
          <GoogleMap />
        </section>
      </main>
    </>
  );
}
