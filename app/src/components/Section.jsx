import { useState } from "react";
import { IoMdEyeOff, IoMdEye } from "react-icons/io";

export default function Section({ title, children }) {
  const [showChildren, setShowChildren] = useState(true);

  return (
    <>
      <div className="flex gap-1 mt-6 mb-2 items-center ">
        <h3 className="text-xl font-bold">{title}</h3>
        <span onClick={() => setShowChildren((prev) => !prev)}>
          {showChildren && <IoMdEyeOff />}
          {!showChildren && <IoMdEye />}
        </span>
      </div>
      {showChildren && children}
    </>
  );
}
