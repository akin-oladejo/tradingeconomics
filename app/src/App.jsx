import { useEffect, useState } from "react";
import { Tooltip } from "antd";
import Card from "./components/Card";
import { MdInfoOutline } from "react-icons/md";
import Segmented from "./components/Segmented";
import News from "./components/News";
import conf from "./conf";
import { parseDate } from "./utils";
import IndicatorCard from "./components/IndicatorCards";
import Heading from "./components/Heading";
import Profile from "./components/Profile";
// import axios from 'axios'
// import fs from "fs";

// news placeholder
const news = [
  {
    date: "2024-05-10T19:50:43.319Z",
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    url: "/",
  },
  {
    date: "2024-03-10T19:50:43.319Z",
    title: "If you want to get an exact match, use the next endpoint",
    url: "/",
  },
  {
    date: "2024-01-06T19:50:43.319Z",
    title: "This is the most common and recommended approach for most cases",
    url: "/",
  },
];

function App() {
  const apiKey = conf.apiKey;

  const [country, setCountry] = useState("Mexico");
  const [showNews, setShowNews] = useState(false);
  const [showIndicators, setShowIndicators] = useState(false);
  // const countrie = [
  //   {
  //     name: "Mexico",
  //     flag: "https://flagcdn.com/mx.svg",
  //     capital: "Mexico City",
  //     currency: {
  //       name: "Mexican peso",
  //       symbol: "$",
  //     },
  //     map: "https://goo.gl/maps/s5g7imNPMDEePxzbA",
  //     profile:
  //       "Mexico is a country in the southern portion of North America. It covers 1,972,550 km2 (761,610 sq mi), making it the world's 13th-largest country by area; with a population of almost 130 million, it is the 10th-most-populous country and the most populous Spanish-speaking country.",
  //   },
  //   {
  //     name: "New Zealand",
  //     flag: "https://flagcdn.com/mx.svg",
  //     capital: "Mexico City",
  //     currency: {
  //       name: "Mexican peso",
  //       symbol: "$",
  //     },
  //     map: "https://goo.gl/maps/s5g7imNPMDEePxzbA",
  //     profile:
  //       "Mexico is a country in the southern portion of North America. It covers 1,972,550 km2 (761,610 sq mi), making it the world's 13th-largest country by area; with a population of almost 130 million, it is the 10th-most-populous country and the most populous Spanish-speaking country.",
  //   },
  //   {
  //     name: "Sweden",
  //     flag: "https://flagcdn.com/se.svg",
  //     capital: "Stockholm",
  //     currency: {
  //       "name": "Swedish krona",
  //       "symbol": "kr"
  //       },
  //     map: "https://goo.gl/maps/iqygE491ADVgnBW39",
  //     profile:
  //       "Sweden is a Nordic country located on the Scandinavian Peninsula in Northern Europe. It borders Norway to the west and north, Finland to the east, and is connected to Denmark in the southwest by a bridge–tunnel across the Öresund. At 450,295 square kilometres (173,860 sq mi), Sweden is the largest Nordic country and the fifth-largest country in Europe.",
  //   },
  //   {
  //     name: "Thailand",
  //     flag: "https://flagcdn.com/mx.svg",
  //     capital: "Mexico City",
  //     currency: {
  //       name: "Mexican peso",
  //       symbol: "$",
  //     },
  //     map: "https://goo.gl/maps/s5g7imNPMDEePxzbA",
  //     profile:
  //       "Mexico is a country in the southern portion of North America. It covers 1,972,550 km2 (761,610 sq mi), making it the world's 13th-largest country by area; with a population of almost 130 million, it is the 10th-most-populous country and the most populous Spanish-speaking country.",
  //   },
  // ];
  const countries = ["Sweden", "Mexico", "New Zealand", "Thailand"];

  // const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  useEffect(() => {
    setShowNews(false);
    setShowIndicators(false);
    // implements a time delay to avoid a 409
    const indicatorTimer = setTimeout(() => {
      console.log("Delaying news by 2s to avoid rate limit");
      setShowIndicators(true);
    }, 2000);
    const newsTimer = setTimeout(() => {
      console.log("Delaying indicators by 5s to avoid rate limit");
      setShowNews(true);
    }, 5000);

    return () => {
      clearTimeout(newsTimer);
      clearTimeout(indicatorTimer);
    };
  }, [country]);

  return (
    <div className="container text-white flex flex-col lg:w-2/3 lg:m-auto font-sans p-8">
      {/* heading */}
      <h1 className="font-bold text-3xl">Economic Profile</h1>
      <p>Select a different country to view its economic indicators</p>

      {/* select country */}
      <select
        className="p-2 rounded-md bg-slate-800 text-white"
        name="Select country"
        id=""
        value={country}
        onChange={(e) => setCountry(e.target.value)}
      >
        {countries.map((country, index) => (
          <option key={index} value={country}>
            {country}
          </option>
        ))}
      </select>

      {/* country details */}
      <Profile country={country}/>

      {/* macro-economic indicators */}
      <Heading title={"Macro-Economic Indicators"} />

      {!showIndicators && <p>Loading indicators...</p>}
      {showIndicators && (
        <Segmented
          className="flex flex-col flex-wrap md:flex-row  gap-5"
          tabs={["gdp", "labour", "taxes", "markets", "climate"]}
        >
          <IndicatorCard country={country} indicator={"gdp"} key={"gdp"} />
          <IndicatorCard
            country={country}
            indicator={"labour"}
            key={"labour"}
          />
          <IndicatorCard country={country} indicator={"taxes"} key={"taxes"} />
          <IndicatorCard
            country={country}
            indicator={"markets"}
            key={"markets"}
          />
          <IndicatorCard
            country={country}
            indicator={"climate"}
            key={"climate"}
          />
        </Segmented>
      )}

      {/* trade charts */}
      <Heading title={"Trade by category"} />

      {/* graphs for import/export */}
      <Segmented tabs={["imports", "exports"]}>
        <img src="/dummy-pie.svg" alt="" key={"imports"} />
        <img src="/dummy-pie-2.svg" alt="" key={"exports"} />
      </Segmented>

      {/* show latest news */}
      <Heading title={"Latest News"} />
      {!showNews && <p>Loading News...</p>}
      {showNews && <News country={country} />}
    </div>
  );
}

export default App;
