import { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";
import { parseDate } from "../utils";

export default function News({ country, apiKey }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `https://api.tradingeconomics.com/news/country/${country}?c=${apiKey}`,
          
        );
        // console.log(response.data);
        setNews(response.data)
        // setNews(response.data.map((item) => item.name.common));
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [country]);

  return (
    <>
      {isLoading && <p>Loading News...</p>}
      {!isLoading && (
        <div className="container flex flex-col gap-5" key={"news-div"}>
          {news.slice(0,5).map((item, index) => (
            <Card
              key={index}
              title={parseDate(item.date)}
              content={item.title}
              foot={<a href={`https://tradingeconomics.com${item.url}`} target="_blank" style={{textDecoration:'underline'}}>visit link</a>}
            />
          ))}
        </div>
      )}
      {error && <p>{`Error occurred: ${error}`}</p>}
    </>
  );
}

// const CountriesDropdown = () => {
//   const [countries, setCountries] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       setIsLoading(true);
//       setError(null);
//       try {
//         const response = await axios.get("https://restcountries.com/v3.1/all");
//         setCountries(response.data.map((country) => country.name.common));
//       } catch (error) {
//         setError(error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (isLoading) return <p>Loading countries...</p>;

//   if (error) return <p>Error fetching countries: {error.message}</p>;

//   return (
//     <select>
//       <option value="">Select a Country</option>
//       {countries.map((country, index) => (
//         <option key={index} value={country}>
//           {country}
//         </option>
//       ))}
//     </select>
//   );
// };
