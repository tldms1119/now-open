import { SelectHTMLAttributes } from "react";

interface SelectProps {
  name: string;
  errors?: string[];
  options: { value: string | number; label: string }[];
}

export default function Select({
  name,
  errors = [],
  options,
  ...rest
}: SelectProps & SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="flex flex-col gap-2">
      <select
        className="bg-transparent rounded-md w-full h-10 focus:outline-none
          ring-2 focus:ring-4 transition ring-neutral-200 focus:ring-sky-500
          border-none placeholder:text-neutral-400 px-2 text-neutral-600"
        name={name}
        {...rest}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {errors.map((error, index) => (
        <span key={index} className="text-red-500 font-medium">
          {error}
        </span>
      ))}
    </div>
  );
}
