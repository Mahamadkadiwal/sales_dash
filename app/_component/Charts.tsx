"use client";
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { ResponsiveContainer } from "recharts";
import { getOrders } from "../_lib/localStorage";
import { Order } from "../_types/order";

type chartPoint = {
  date: string;
  orders: number;
  income: number;
}

interface chartDataSet{
  dailyChart: chartPoint[];
  monthlyChart: chartPoint[];
  weeklyChart: chartPoint[];
}


export default function Charts() {
  const [data, setData] = useState<chartDataSet | null>(null);
  const [chartType, setChartType] = useState<"daily" | "monthly" | "weekly">('daily');

  useEffect(() => {
    const orders = getOrders() as Order[] | null;
    if (orders && orders.length > 0) {
      const dailyData : Record<string, chartPoint> = {};
      const monthlyDate : Record<string, chartPoint> = {};
      const weeklyData : Record<string, chartPoint> = {};

      orders.forEach((order) => {
        const date = new Date(order.order_date); 
        const d = order.order_date; 

        const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

        const year = date.getFullYear();
        const week = Math.ceil(
            ((+date - +new Date(year, 0, 1)) / 86400000 + new Date(year, 0, 1).getDay() + 1) / 7
        );

        const key = `${year}-W${week}`;

        if (!dailyData[d]) {
          dailyData[d] = {date: d, orders: 0, income: 0 };
        }
        if(!monthlyDate[month]){
            monthlyDate[month] = { date: month, orders: 0, income: 0 };
        }

        if(!weeklyData[key]){
            weeklyData[key] = { date: key, orders: 0, income: 0 };
        }

        weeklyData[key].orders +=1;
        weeklyData[key].income += Number(order.amount);

        monthlyDate[month].orders +=1;
        monthlyDate[month].income += Number(order.amount);

        dailyData[d].orders += 1;
        dailyData[d].income += Number(order.amount);
      });

      

      // const dailyChart = Object.entries(dailyData).map(([date, v]) => ({
      //   date,
      //   orders: v.orders,
      //   income: v.income,
      // }));

      // const monthlyChart = Object.entries(monthlyDate).map(([date, v]) => ({
      //   date,
      //   orders: v.orders,
      //   income: v.income,
      // }));  

      // const weeklyChart = Object.entries(weeklyData).map(([date, v]) => ({
      //   date,
      //   orders: v.orders,
      //   income: v.income,
      // })); 

       setData({
        dailyChart: Object.values(dailyData),
        monthlyChart: Object.values(monthlyDate),
        weeklyChart: Object.values(weeklyData),
      });
    }
  }, []);

  const handleChartData = (type: "daily" | "monthly" | "weekly") => 
  {
    setChartType(type);
  }

  return (
  <div className="w-full">
    <div className="flex flex-col rounded mt-4 mx-2 md:mx-4 p-2 md:p-4">
      
      {/* Buttons */}
      <div className="flex justify-end mb-2">
        <div className="chart-switch flex gap-2">
          <button
            className={`chart-btn ${chartType === "daily" ? "active" : ""}`}
            onClick={() => handleChartData("daily")}
          >
            Daily
          </button>

          <button
            className={`chart-btn ${chartType === "monthly" ? "active" : ""}`}
            onClick={() => handleChartData("monthly")}
          >
            Monthly
          </button>

          <button
            className={`chart-btn ${chartType === "weekly" ? "active" : ""}`}
            onClick={() => handleChartData("weekly")}
          >
            Weekly
          </button>
        </div>
      </div>

      {/* Responsive Chart */}
      <div className="w-full h-[250px] sm:h-[320px] md:h-[380px] lg:h-[420px] flex items-center justify-center">

        {!data || data[`${chartType}Chart`].length === 0 ? (
          <div className="text-center text-gray-500 text-sm md:text-base">
             No orders found yet
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data[`${chartType}Chart`]}
              margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tick={{ fontSize: 10 }} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="orders" stroke="#8884d8" activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="income" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        )}

      </div>
    </div>
  </div>
);

}


