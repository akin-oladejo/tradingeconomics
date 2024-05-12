import { useEffect, useState } from "react";
import { Tooltip } from "antd";
import Card from "./components/Card";
import { MdInfoOutline } from "react-icons/md";
import Segmented from "./components/Segmented";
// import axios from 'axios'
import fs from "fs";

function parseDate(dateString) {
  const parsedDate = new Date(Date.parse(dateString));

  return parsedDate.toLocaleString("en-US", {
    month: "long",
    year: "numeric",
    day: "numeric",
  });
}


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
  const [country, setCountry] = useState("Nigeria");
  const [options, setOptions] = useState([]);

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  // get list of countries
  useEffect(() => {
    fetch("./countries.json")
      .then((res) => res.json())
      .then((res) => setOptions(res));
  }, []);


  return (
    <div className="container flex flex-col lg:w-2/3 lg:m-auto font-sans p-8">
      {/* heading */}
      <h1 className="font-bold text-3xl">Economic Profile</h1>
      <p>Select a different country to view its economic indicators</p>

      {/* select component */}
      <select className="lg:w-1/2 " name="Select country" id="" value={country} onChange={(e)=>setCountry(e.target.value)}>
        {options.map((country, index) => (
          <option key={index} value={country}>
            {country}
          </option>
        ))}
      </select>
      {/* <SelectCountry /> */}

      {/* country details */}
      <h2 className="text-2xl font-bold mt-5">{capitalize(country)}</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid ducimus
        sunt odio saepe animi, qui amet optio aut pariatur necessitatibus
        assumenda perspiciatis iste voluptatum. Veniam illum commodi quibusdam
        ipsa delectus.
      </p>

      {/* macro-economic indicators */}
      <div className="flex mt-5 gap-1 items-center">
        <h3 className="text-xl font-bold">Macro-Economic Indicators</h3>
        {/* <Tooltip> */}
        <MdInfoOutline />
        {/* </Tooltip> */}
      </div>

      {/* macro-economic cards */}
      <div className="flex flex-col md:flex-row gap-5">
        <Card
          title={"GDP"}
          content={"$4.2 Trillion"}
          foot={"-3.2%"}
          tooltip={
            "Gross domestic product is a monetary measure of the market value of all the final goods and services produced and rendered in a specific time period by a country or countries"
          }
        />

        <Card
          title={"GDP"}
          content={"$4.2 Trillion"}
          foot={"-3.2%"}
          tooltip={
            "Gross domestic product is a monetary measure of the market value of all the final goods and services produced and rendered in a specific time period by a country or countries"
          }
        />

        <Card
          title={"GDP"}
          content={"$4.2 Trillion"}
          foot={"-3.2%"}
          tooltip={
            "Gross domestic product is a monetary measure of the market value of all the final goods and services produced and rendered in a specific time period by a country or countries"
          }
        />
      </div>

      {/* trade charts */}
      <div className="flex mt-5 gap-1 items-center">
        <h3 className="text-xl font-bold">Trade by category</h3>
        {/* <Tooltip title="Imports and exports of goods by category"> */}
        <MdInfoOutline />
        {/* </Tooltip> */}
      </div>

      {/* graphs for import/export */}
      <Segmented tabs={["imports", "exports"]}>
        <img src="/dummy-pie.svg" alt="" key={"imports"} />
        <img src="/dummy-pie-2.svg" alt="" key={"exports"} />
      </Segmented>

      <div className="flex gap-1 items-center ">
        <h3 className="text-xl font-bold">Latest News</h3>
        {/* <Tooltip> */}
        <MdInfoOutline />
        {/* </Tooltip> */}
      </div>

      <div className="container flex flex-col gap-5" key={"news-div"}>
        {news.map((item, index) => (
          <Card
            key={index}
            title={parseDate(item.date)}
            content={<a href={item.url}>{item.title}</a>}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
