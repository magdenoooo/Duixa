import { Controller, useFormContext } from "react-hook-form";
import { SchemaType } from ".";
interface Props {
  name: "phone" | "email" | "message" | "fullName";
  icon: any;
  placeholder: string;
  area?: boolean;
  isHome?: boolean;
}
export default function CustomInput({ name, icon, placeholder, area, isHome }: Props) {
  const { control, formState } = useFormContext<SchemaType>();
  if (!area) {
    return (
      <Controller
      
        name={name}
        control={control}
        render={({ field }) => (
          <div className="relative flex flex-col gap-2 ">
            <label htmlFor={name} className="absolute top-[45%] translate-y-[-50%] right-[24px]">
              {icon}
            </label>
            <input
              id={name}
              {...field}
              className={`${isHome?"bg-background":"bg-white"} border border-border  p-[24px] w-full rounded-[15px] pr-[64px] placeholder:text-dark-gray caret-second-primary-color`}
              type="text"
              placeholder={placeholder}
            />
            <span className=""> {formState.errors[name]?.message} </span>
          </div>
        )}
      />
    );
  } else {
    return (
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div className="relative flex flex-col gap-2">
            <label htmlFor={name} className="absolute top-[22px] right-[23px]">
              {" "}
              {icon}{" "}
            </label>
            <textarea
              id={name}
              {...field}
              className={`${isHome?"bg-background":"bg-white"} border border-border  p-[24px] w-full h-[295px] rounded-[15px] pr-[64px] placeholder:text-dark-gray caret-second-primary-color `}
              placeholder={placeholder}
            />
            <span className=""> {formState.errors[name]?.message} </span>
          </div>
        )}
      />
    );
  }
}
