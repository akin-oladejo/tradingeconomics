import { useState } from "react";

function Segmented({ tabs, children, className }) {
  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  return (
    <>
      {/* tab buttons */}
      <div className="container flex flex-wrap gap-2 mb-3">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`flex cursor-pointer justify-center rounded-3xl 
              ${
                tab == selectedTab
                  ? "bg-black text-white"
                  : "bg-white text-black"
              }
                w-fit px-3 py-1`}
            onClick={() => {
              setSelectedTab(tab);
            }}
          >
            {tab}
          </div>
        ))}
      </div>

      <div className={className}>
        {/* segmented content */}
      {children.filter((content) => {
          // console.log(content.tab);
          return content.key == selectedTab;
        })}
      </div>
      
      {/* <div className="my-5 lg:w-1/2 h-72 bg-black rounded-xl flex justify-center items-center">
        
      </div> */}
    </>
  );
}

export default Segmented;
