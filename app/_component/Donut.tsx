import { useEffect, useState } from "react";
import { Cell, Legend, Pie, PieChart, Tooltip, ResponsiveContainer } from "recharts";
import { getOrders } from "../_lib/localStorage";

type order = {
  status: string;
};

type PieItem = {
  name: string;
  value: number;
};

export default function Donut() {
  const COLORS = ["#4ADE80", "#60A5FA", "#A78BFA", "#F87171", "#FACC15"];
  const [data, setData] = useState<PieItem[] | null>(null);

  useEffect(() => {
    const orders = getOrders() as order[] | null;
    if (!orders) return;

    const statusCount: Record<string, number> = {};

    orders.forEach((order) => {
      const status = order.status || "Unknown";
      statusCount[status] = (statusCount[status] || 0) + 1;
    });

    const chartData = Object.keys(statusCount).map((status) => ({
      name: status,
      value: statusCount[status],
    }));

    setData(chartData);
  }, []);

  return (
    <div className="w-full">
      <h3 className="text-xl font-semibold text-center text-(--font-color) mb-2">
        Order Information
      </h3>

      <div className="w-full h-[240px] sm:h-[280px] md:h-[320px] lg:h-[360px]">
        {data && (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius="45%"
                outerRadius="70%"
                paddingAngle={3}
              >
                {data.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>

              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
