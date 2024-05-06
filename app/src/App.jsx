import { useState } from "react";

import "./App.css";

function App() {
  const [country, setCountry] = useState("nigeria");

  return (
    <>
      <div className="flex-col">
        {/* heading */}
        <h1>Economic Profile</h1>
        <p>Select a different country to view its economic indicators</p>

        {/* select component */}
        <select name="Select country" id=""></select>

        {/* country details */}
        <h2>{country}</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
          ducimus sunt odio saepe animi, qui amet optio aut pariatur
          necessitatibus assumenda perspiciatis iste voluptatum. Veniam illum
          commodi quibusdam ipsa delectus.
        </p>

        {/* macro-economic indicators */}
        <div>
          <h3>Macro-Economic Indicators</h3>
          <img src="/info.svg" alt="info" />
        </div>

        {/* trade charts */}
        <div>
          <h3>Trade</h3>
          <img src="/info.svg" alt="info" />
        </div>

        {/* segmented tab component */}
        {/* chart here */}

        <div>
          <h3>Latest News</h3>
          <img src="/info.svg" alt="info" />
        </div>
      </div>
    </>
  );
}

export default App;
