import React from "react";
import { useController } from "react-hook-form";

const RadioHook = ({ control, ...props }) => {
  const { field } = useController({
    control,
    name: props.name,
    defaultValue: props.value,
  });
  return (
    <label className="cursor-pointer custom-radio">
      <input
        type="radio"
        {...field}
        className="hidden"
        value={props.value}
        checked={props.checked}
      />
      <div className="bg-white rounded-full w-full h-full"></div>
    </label>
  );
};

export default RadioHook;
