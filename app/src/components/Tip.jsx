import React from "react";

function Tip({ title, children }) {
  return (
    <div className="">
      <div className="hidden relative hover:block">{title}</div>
      {children}
    </div>
  );
}

export default Tip;
