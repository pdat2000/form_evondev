import { useEffect, useRef, useState } from "react";

export default function useClickOutSide(dom = "") {
  const [show, setShow] = useState(false);
  const nodeRef = useRef();
  useEffect(() => {
    function handleClickOutDropdown(e) {
      if (nodeRef.current && !nodeRef.current.contains(e.target)) {
        setShow(false);
      }
    }
    document.addEventListener("click", handleClickOutDropdown);
    return () => {
      document.removeEventListener("click", handleClickOutDropdown);
    };
  }, []);
  return {
    show,
    setShow,
    nodeRef,
  };
}
