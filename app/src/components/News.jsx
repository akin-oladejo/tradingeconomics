import { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";
import { parseDate } from "../utils";
import conf from "../conf";

export default function News({ country }) {
  const [newsIsLoading, setNewsIsLoading] = useState(false);
  const [newsError, setNewsError] = useState(null);
  const [news, setNews] = useState(null);

  const apiKey = conf.apiKey;

  useEffect(() => {
    const fetchData = async () => {
      setNewsIsLoading(true);
      setNewsError(null);
      try {
        // setTimeout(() => {console.log("Delaying by 5s to avoid rate limit");}, 5000);
        const response = await axios.get(
          `https://api.tradingeconomics.com/news/country/${country}?c=${apiKey}`
        );
        setNews(response.data);
      } catch (newsError) {
        setNewsError(newsError);
      } finally {
        setNewsIsLoading(false);
      }
    };

    fetchData();
  }, [country]);

  return (
    <>
      {newsIsLoading && <p>Loading News...</p>}
      {newsError && <p>{`Error occurred: ${newsError}`}</p>}
      {news && (
        <div className="container flex flex-col gap-5" key={"news-div"}>
          {news.slice(0, 5).map((item, index) => (
            <Card
              key={index}
              title={parseDate(item.date)}
              content={item.title}
              foot={
                <a
                  href={`https://tradingeconomics.com${item.url}`}
                  target="_blank"
                  style={{  color: '#66C69A' }}
                >
                  read more
                </a>
              }
            />
          ))}
        </div>
      )}
    </>
  );
}
