import Card from "./Card";
import { useState, useEffect } from "react";
import conf from "../conf";
import axios from "axios";

export default function IndicatorCards({ country, indicator, info }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  const apiKey = conf.apiKey;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // setTimeout(()=>{console.log('Delaying by 2s to avoid rate limit')},2000)
        const response = await axios.get(
          `https://api.tradingeconomics.com/country/${country}?c=${apiKey}&group=${indicator}`
        );
        // console.log(response.data);
        setData(response.data);
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
      {isLoading && <p>Loading Info...</p>}
      {error && <Card content={error.message} />}
      {!error &&
        !isLoading &&
        data
          .slice(0, 5)
          .map((i, index) => (
            <Card
              for={indicator}
              key={index}
              title={`${i.Category} ${i.Unit?'('+i.Unit+')':''}`}
              content={i.LatestValue.toLocaleString()}
              foot={`was: ${
                i.PreviousValue ? i.PreviousValue.toLocaleString(): ""
              }`}
              tooltip={info}
            />
          ))}
    </>
  );
}
