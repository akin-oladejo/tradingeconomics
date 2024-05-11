import { useState } from "react";

function Segmented({ tabs, children }) {
  const [selectedTab, setSelectedTab] = useState(tabs[0]);

//   const handleClick = (index) => {
//     setSelectedTab(index);
//   };

  return (
    <>
    {/* tab buttons */}
      <div className="flex gap-2 my-2">
        {tabs.map((tab, index) => (
          <>
            <div
              key={"details"}
              className={`flex cursor-pointer justify-center rounded-3xl 
              ${tab == selectedTab ? "bg-black text-white" : "bg-white text-black"}
                w-fit px-3 py-1`}
              onClick={() => {
                setSelectedTab(tab);
              }}
            >
              {tab}
            </div>
          </>
        ))}
      </div>

      {/* segmented content */}
      <div className="my-5 lg:w-1/2 h-72 bg-black rounded-xl flex justify-center items-center">
        {children.filter((content, index)=>{return content.key==selectedTab})}
      </div>
    </>
  );
}

export default Segmented;
