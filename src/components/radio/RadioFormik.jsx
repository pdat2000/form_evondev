import React from "react";
import { useField } from "formik";

const RadioFormik = (props) => {
  const [field] = useField(props);
  return (
    <div className="flex items-center gap-x-3">
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
      <span>{props.label} </span>
    </div>
  );
};

export default RadioFormik;
