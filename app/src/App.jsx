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
  // const countries = [{name:'Sweden'}, {name:'Mexico'}, {name:'New Zealand'}, {name:'Thailand'}]
  const countries = ["Sweden", "Mexico", "New Zealand", "Thailand"];

  // const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  useEffect(() => {
    setShowNews(false);
    setShowIndicators(false);
    // implements a time delay to avoid a 409
    const indicatorTimer = setTimeout(() => {
      console.log('Delaying news by 2s to avoid rate limit')
      setShowIndicators(true);
    }, 2000);
    const newsTimer = setTimeout(() => {
      console.log('Delaying indicators by 5s to avoid rate limit')
      setShowNews(true);
    }, 5000);
    
    return () => {
      clearTimeout(newsTimer);
      clearTimeout(indicatorTimer);
    };
  }, [country]);

  return (
    <div className="container flex flex-col lg:w-2/3 lg:m-auto font-sans p-8">
      {/* heading */}
      <h1 className="font-bold text-3xl">Economic Profile</h1>
      <p>Select a different country to view its economic indicators</p>

      {/* select component */}
      <select
        className="lg:w-1/2 p-2 rounded-md bg-black text-white"
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
      {/* <SelectCountry /> */}

      {/* country details */}
      <h2 className="text-2xl font-bold mt-5">{country}</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid ducimus
        sunt odio saepe animi, qui amet optio aut pariatur necessitatibus
        assumenda perspiciatis iste voluptatum. Veniam illum commodi quibusdam
        ipsa delectus.
      </p>

      {/* macro-economic indicators */}
      <Heading title={'Macro-Economic Indicators'}/>

      {!showIndicators && <p>Loading indicators...</p>}
      {showIndicators && (
        <Segmented
          className="flex flex-col flex-wrap md:flex-row  gap-5"
          tabs={["gdp", "labour", "taxes", "markets", "climate"]}
        >
          <IndicatorCard country={country} indicator={"gdp"} key={"gdp"} />
          <IndicatorCard country={country} indicator={"labour"} key={"labour"}/>
          <IndicatorCard country={country} indicator={"taxes"} key={"taxes"} />
          <IndicatorCard country={country} indicator={"markets"} key={"markets"} />
          <IndicatorCard country={country} indicator={"climate"} key={"climate"} />
        </Segmented>
      )}

      {/* trade charts */}
      <Heading title={'Trade by category'}/>

      {/* graphs for import/export */}
      <Segmented tabs={["imports", "exports"]}>
        <img src="/dummy-pie.svg" alt="" key={"imports"} />
        <img src="/dummy-pie-2.svg" alt="" key={"exports"} />
      </Segmented>

      {/* show latest news */}
      <Heading title={'Latest News'}/>
      {!showNews && <p>Loading News...</p>}
      {showNews && <News country={country} />}
    </div>
  );
}

export default App;
