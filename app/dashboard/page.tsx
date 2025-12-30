"use client";
import { useEffect, useState } from "react";
import BarChartShown from "../_component/BarChartShown";
import Charts from "../_component/Charts";
import DashboardCard from "../_component/DashboardCard";
import Donut from "../_component/Donut";
import OrderTable from "../_component/OrderTable";
import PageHeader from "../_component/PageHeader";
import { dashboardCountData } from "../_lib/localStorage";
import { DashboardData } from "../_lib/Types";

export default function page() {
  const [data, setData] = useState<DashboardData | null>(null);
  // const data = {
  //   totalOrders: 12,
  //   products: 10,
  //   customers: 5,
  //   totalIncome: 1000,
  // }

  

  useEffect(() => {
    const data = dashboardCountData();
    if (data) {
      setData(data);
    }
  }, []);

  if (data == null) {
    return <div>Loading...</div>;
  }
  return (
    <div className="bg-white min-h-screen p-2">
      <PageHeader title="Dashboard" />

      <div className="mb-8">
        <DashboardCard data={data} />
      </div>

      <div className="mt-2">
        <OrderTable />
      </div>

      <div className="rounded-xl bg-white shadow-sm">
        <Charts />
      </div>
      
      <div className="mt-2 p-4 rounded-xl bg-white shadow-sm">

        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">

          <div className="w-full lg:w-1/2 flex justify-center">
            <Donut />
          </div>

          <div className="w-full lg:w-1/2 flex justify-center">
            <BarChartShown />
          </div>

        </div>

      </div>

    </div>
  );
}
