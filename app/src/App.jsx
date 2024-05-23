import { useEffect, useState } from "react";
import Segmented from "./components/Segmented";
import News from "./components/News";
import IndicatorCard from "./components/IndicatorCards";
import Profile from "./components/Profile";
import Section from "./components/Section";
import Table from "./components/Table";

function App() {
  // state variables
  const [country, setCountry] = useState("Mexico");
  const [showNews, setShowNews] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [showIndicators, setShowIndicators] = useState(false);

  // free country options 
  const countries = ["Sweden", "Mexico", "New Zealand", "Thailand"];

  // load components after some delay to avoid a 409 from rate limiting
  useEffect(() => {
    setShowNews(false);
    setShowTable(false);
    setShowIndicators(false);

    // time delay 
    const indicatorTimer = setTimeout(() => {
      console.log("Delaying news by 2s to avoid rate limit");
      setShowIndicators(true);
    }, 2000);

    const tableTimer = setTimeout(() => {
      console.log("Delaying indicators by 5s to avoid rate limit");
      setShowTable(true);
    }, 4000);

    const newsTimer = setTimeout(() => {
      console.log("Delaying indicators by 5s to avoid rate limit");
      setShowNews(true);
    }, 6000);

    return () => {
      clearTimeout(newsTimer);
      clearTimeout(tableTimer);
      clearTimeout(indicatorTimer);
    };
  }, [country]);

  return (
    <div className="container text-white flex flex-col lg:w-2/3 lg:m-auto font-sans p-8">
      {/* heading */}
      <h1 className="font-bold text-3xl mb-2">Economic Profile</h1>
      <p>Select a different country to view its economic indicators</p>

      {/* select country from options */}
      <select
        className="p-2 rounded-md bg-slate-700 text-white mt-5"
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
      <Profile country={country} />

      {/* macro-economic indicators */}
      <Section title={"Macro-Economic Indicators"}>
        {!showIndicators && <p>Loading indicators...</p>}
        {showIndicators && (
          <Segmented
            className="flex flex-col flex-wrap md:flex-row  gap-5"
            tabs={[
              "gdp",
              "labour",
              "business",
              "taxes",
              "markets",
              "climate",
              "housing",
              "prices",
            ]}
          >
            <IndicatorCard
              country={country}
              indicator={"business"}
              key={"business"}
            />
            <IndicatorCard
              country={country}
              indicator={"housing"}
              key={"housing"}
            />
            <IndicatorCard
              country={country}
              indicator={"prices"}
              key={"prices"}
            />
            <IndicatorCard country={country} indicator={"gdp"} key={"gdp"} />
            <IndicatorCard
              country={country}
              indicator={"labour"}
              key={"labour"}
            />
            <IndicatorCard
              country={country}
              indicator={"taxes"}
              key={"taxes"}
            />
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
      </Section>

      {/* trade tables */}
      <Section title={"Trade by category"}>
        {/* graphs for import/export */}
        {!showNews && <p>Loading Table...</p>}
        {showTable && <Segmented tabs={["imports", "exports"]}>
          <Table country={country} type={"import"} key={"imports"} />
          <Table country={country} type={"export"} key={"exports"} />
        </Segmented>}
      </Section>

      {/* show latest news */}
      <Section title={"Latest News"}>
        {!showNews && <p>Loading News...</p>}
        {showNews && <News country={country} />}
      </Section>
    </div>
  );
}

export default App;
