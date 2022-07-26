import React, { useEffect, useState } from "react";
import useClickOutSide from "../../hooks/useClickOutSide";
import { useField } from "formik";

const dropdownData = [
  {
    id: 1,
    value: "Frontend Developer",
    text: "Frontend Developer",
  },
  {
    id: 2,
    value: "Backend Developer",
    text: "Backend Developer",
  },
  {
    id: 3,
    value: "Fullstack Developer",
    text: "Fullstack Developer",
  },
];
const DropdownFormik = ({
  name,
  textLabel,
  dropdownLabel = "Select your job",
  setValue,
}) => {
  const { show, setShow, nodeRef } = useClickOutSide();
  const [label, setLabel] = useState(dropdownLabel);
  const handleClickDropdownItem = (e) => {
    setValue(name, e.target.dataset.value);
    setShow(false);
    setLabel(e.target.innerText);
  };
  const [field, meta] = useField({ name });
  useEffect(() => {
    if (field.value === "") {
      setLabel(dropdownLabel);
    }
  }, [field.value]);
  return (
    <div className="flex flex-col gap-3 mb-5">
      <label className="cursor-pointer">{textLabel}</label>
      <div className="relative" ref={nodeRef}>
        <div
          className="p-5 rounded-lg border border-gray-100 bg-white flex items-center justify-content cursor-pointer"
          onClick={() => setShow(!show)}
        >
          <span>{label}</span>
        </div>
        <div
          className={`absolute top-full left-0 w-full rounded-lg bg-white ${
            show ? "" : "opacity-0 invisible"
          }`}
        >
          {dropdownData.map((item) => (
            <div
              className="p-5 cursor-pointer hover:bg-gray-200"
              onClick={handleClickDropdownItem}
              data-value={item.value}
              key={item.id}
            >
              {item.text}
            </div>
          ))}
        </div>
      </div>
      {meta.touched && meta.error && (
        <p className="text-red-500 text-sm">{meta.error}</p>
      )}
    </div>
  );
};

export default DropdownFormik;
