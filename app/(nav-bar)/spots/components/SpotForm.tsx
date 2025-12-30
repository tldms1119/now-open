"use client";

import { useActionState, useEffect, useState } from "react";
import { createSpot, updateSpot, Spot } from "../action";
import Input from "@/components/form-input";
import Button from "@/components/form-button";
import BusinessHoursField, { BusinessHourContent } from "./BusinessHoursField";
import PhotoUploader from "./PhotoUploader";

interface SpotFormProps {
  onCancel: () => void;
  spot?: Spot | null;
}

export default function SpotForm({ onCancel, spot }: SpotFormProps) {
  const isEditMode = !!spot;
  const initialState = {
    spotId: spot?.id || "",
    name: spot?.name || "",
    desc: spot?.desc || "",
    longitude: spot?.longitude?.toString() || "",
    latitude: spot?.latitude?.toString() || "",
    businessHours: spot?.businessHours || [],
    photos: [],
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
  };

  const [createState, createDispatch] = useActionState(
    createSpot,
    initialState
  );
  const [updateState, updateDispatch] = useActionState(
    updateSpot,
    initialState
  );

  const state = isEditMode ? updateState : createState;
  const dispatch = isEditMode ? updateDispatch : createDispatch;

  const [businessHours, setBusinessHours] = useState<BusinessHourContent[]>(
    spot?.businessHours || state.businessHours || []
  );
  const [photos, setPhotos] = useState<File[]>([]);

  useEffect(() => {
    if (spot) {
      setBusinessHours(spot.businessHours || []);
    } else {
      setBusinessHours(state.businessHours || []);
    }
  }, [spot, state.businessHours]);

  const handleFormSubmit = (formData: FormData) => {
    if (isEditMode && spot) {
      formData.set("spotId", spot.id);
    }
    formData.set("businessHours", JSON.stringify(businessHours));
    photos.forEach((file) => formData.append("photos", file));
    dispatch(formData);
  };

  return (
    <>
      <h2 className="text-2xl font-semibold mb-2">
        {isEditMode ? "Update Spot" : "Add a New Spot"}
      </h2>
      <label className="font-medium">Basic Information</label>
      <form action={handleFormSubmit} className="flex flex-col gap-3 mt-2">
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
        <BusinessHoursField
          businessHours={businessHours}
          onChange={setBusinessHours}
        />
        <span className="text-red-500 font-medium">
          {state?.error?.formErrors || ""}
        </span>

        {/* photos */}
        <PhotoUploader photos={photos} onPhotosChange={setPhotos} />

        <div className="flex gap-2">
          <Button text={isEditMode ? "Update Spot" : "Add Spot"} />
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
}
