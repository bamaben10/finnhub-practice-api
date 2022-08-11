import React, { useContext, useState, useEffect } from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { chartConfig } from "../constants/config";
import ThemeContext from "../context/ThemeContext";
import {
  convertUnixTimestampToDate,
  convertDateToUnixTimestamp,
  createDate,
} from "../helpers/date-helper";
import Card from "./Card";
import ChartFilter from "./ChartFilter";
import { fetchHistoricalData } from "../api/stock-api";
import StockContext from "../context/StockContext";

const Chart = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("1W");

  const { darkMode } = useContext(ThemeContext);
  const { stockSymbol } = useContext(stockContext);

  const formatData = (data) => {
    return data.c.map((item, index) => {
      return {
        value: item.toFixed(2),
        date: convertUnixTimestampToDate(data.t[index]),
      };
    });
  };

  useEffect(() => {
    const getDateRange = () => {
      const { days, weeks, months, years } = chartConfig[filter];

      const endDate = newDate();
      const startDate = createDate(endDate, -days, -weeks, -months, -years);

      const startTimestampUnix = convertDateToUnixTimestamp(startDate);
      const endTimestampUnix = convertDateToUnixTimestamp(endDate);

      return { startTimestampUnix, endTimestampUnix };
    };

    const updateChartData = async () => {
      try {
        const { startTimestampUnix, endTimestampUnix } = getDateRange();
        const resolution = chartConfig[filter].resolution;
        const result = await fetchHistoricalData(
          stockSymbol,
          resolution,
          startTimestampUnix,
          endTimestampUnix
        );
        setData(formatData(result));
      } catch (error) {
        setData([]);
        console.log(error);
      }
    };

    updateChartData();
  }, [stockSymbol, filter]);

  return (



    



                text={item}
                active={filter === item}
                onClick={() => {
                    setFilter(item);
                }}
               />
            </li>
          );
        })}
        </ul>
        <ResponsiveContainer>
            <AreaChart data={data}>
                <defs>
                    <linearGradient id="chartColor" x1="0" y1="0" x2="0" y2="1">
                        <stop 
                          offset="5%"
                          stopColor={darkMode ? "#312e81" : "rgb(199 210 254)"}
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor={darkMode ? "#312e81" : "rgb(199 210 254)"}
                          stopOpacity={0}
                        />
                      /</linearGradient>
                    
  )
};



