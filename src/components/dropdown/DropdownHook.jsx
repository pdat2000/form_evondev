import React, { useEffect, useState } from "react";
import { useWatch } from "react-hook-form";
import useClickOutSide from "../../hooks/useClickOutSide";

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
const DropdownHook = ({ control, setValue, name, dropdownLabel }) => {
  const { show, setShow, nodeRef } = useClickOutSide();
  const dropdownValue = useWatch({
    control,
    name: "job",
    defaultValue: "",
  });
  const [label, setLabel] = useState(dropdownLabel);
  const handleClickDropdownItem = (e) => {
    setValue(name, e.target.dataset.value);
    setShow(false);
    setLabel(e.target.innerText);
  };
  useEffect(() => {
    if (dropdownValue === "") {
      setLabel(dropdownLabel);
    }
  }, [dropdownValue]);
  return (
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
  );
};

export default DropdownHook;
