// table component. there is a slider to increase the number of rows

import axios from "axios";
import { useState, useEffect } from "react";
import conf from "../conf";

function Table({ country, type }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [rows, setRows] = useState(5);

  const apiKey = conf.apiKey;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `https://api.tradingeconomics.com/comtrade/${type}/${country}?c=${apiKey}`
        );
        setData(response.data);
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
      {isLoading && <p>Loading Data...</p>}
      {error && <p>{`Error occurred: ${error}`}</p>}
      {data && (
        <>
          <div className="flex items-center gap-2 w-full">
            <input
              type="range"
              name=""
              id=""
              onChange={(e) => setRows(e.target.value)}
              value={rows}
              min={5}
              max={15}
            />
            <div>Number of rows: </div>
            <div>{rows}</div>
          </div>
          <table className="w-full my-3 table-auto text-left bg-slate-800">
            <thead>
              <th className=" border-fuchsia-300 text-trade-green bg-slate-900 p-2">Category</th>
              <th  className=" border-fuchsia-300 text-trade-green bg-slate-900 p-2">Value</th>
            </thead>
            <tbody>
              {data.slice(0, rows).map((row, index) => (
                <>
                  <tr key={index}>
                    <td  className=" p-2">{row.category}</td>
                    <td  className=" p-2"   >{row.value.toLocaleString()}</td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
}

export default Table;
