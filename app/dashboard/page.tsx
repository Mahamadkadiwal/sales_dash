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

export default function Page() {
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    const loadDashboard = () => {
    const data = dashboardCountData();
    if (data) setData(data);
  };

  loadDashboard(); 

  window.addEventListener("orders-updated", loadDashboard);

  return () =>
    window.removeEventListener("orders-updated", loadDashboard);
  }, []);

  if (!data) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-3 md:p-4 lg:p-6">
      
      <PageHeader title="Dashboard" />

      {/* Top Stats Cards */}
      <div className="mb-6">
        <DashboardCard data={data} />
      </div>

      {/* Orders Table */}
      <div className="mt-4 bg-white shadow-sm rounded-xl p-2 md:p-4 overflow-x-auto">
        <OrderTable />
      </div>

      {/* Line Chart */}
      <div className="mt-6 rounded-xl bg-white shadow-sm p-2 md:p-4">
        <Charts />
      </div>

      
      <div className="mt-6 p-2 md:p-4 rounded-xl bg-white shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          <div className="flex justify-center">
            <Donut />
          </div>

          <div className="flex justify-center">
            <BarChartShown />
          </div>

        </div>
      </div>

    </div>
  );
}

