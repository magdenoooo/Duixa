import { Controller, useFormContext } from "react-hook-form";
import { SchemaType } from ".";

interface Props {
  name: "phone_number" | "email" | "message" | "full_name";
  icon: any;
  placeholder: string;
  area?: boolean;
  isHome?: boolean;
}

export default function CustomInput({ name, icon, placeholder, area, isHome }: Props) {
  const { control, formState } = useFormContext<SchemaType>();
  
  if (!area) {
    return (
      <div className="relative flex flex-col gap-2">
        <label htmlFor={name} className="absolute top-[45%] translate-y-[-50%] right-[24px] z-10">
          {icon}
        </label>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <input
              id={name}
              {...field}
              className={`${isHome ? "bg-background" : "bg-white"} border border-border p-[24px] w-full rounded-[15px] pr-[64px] placeholder:text-dark-gray caret-second-primary-color focus:outline-none focus:border-second-primary-color`}
              type={name === "email" ? "email" : "text"}
              placeholder={placeholder}
            />
          )}
        />
        {formState.errors[name]?.message && (
          <span className="text-red-500 text-sm">{formState.errors[name]?.message}</span>
        )}
      </div>
    );
  } else {
    return (
      <div className="relative flex flex-col gap-2">
        <label htmlFor={name} className="absolute top-[22px] right-[23px] z-10">
          {icon}
        </label>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <textarea
              id={name}
              {...field}
              className={`${isHome ? "bg-background" : "bg-white"} border border-border p-[24px] w-full h-[295px] rounded-[15px] pr-[64px] placeholder:text-dark-gray caret-second-primary-color focus:outline-none focus:border-second-primary-color resize-none`}
              placeholder={placeholder}
            />
          )}
        />
        {formState.errors[name]?.message && (
          <span className="text-red-500 text-sm">{formState.errors[name]?.message}</span>
        )}
      </div>
    );
  }
}