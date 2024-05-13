import { useState, useEffect } from "react";
import axios from "axios";

export default function Profile({ country }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `https://restcountries.com/v3.1/name/${country}?fields=name,currencies,flags,maps,languages,capital`
        );
        setData(response.data[0]);
        // console.log(response.data[0]);
        // console.log(countryData)
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
      {isLoading && <p>Loading Profile...</p>}
      {error && <p>{`Error occurred: ${error}`}</p>}
      {data && (
        <div className="mt-5 flex flex-col gap-2">
          <h2 className="text-2xl font-bold ">{data["name"]["common"]}</h2>
          <p>Flag: <img
            className="w-10 h-auto inline"
            src={data["flags"]["svg"]}
            alt="mexican flag"
          />    </p>
          {console.log()}
          <p>{`Currency: ${Object.values(data["currencies"])[0]['name']} (${Object.values(data["currencies"])[0]['symbol']})`}</p>
          <p>
            Map:{" "}
            <a href={data["maps"]["googleMaps"]} target="_blank" className="text-fuchsia-300">
              View in Google Maps
            </a>
          </p>
          <p>{`Language(s) spoken: ${Object.values(data["languages"]).join(', ')}`}</p>
        </div>
      )}
    </>
  );
}
