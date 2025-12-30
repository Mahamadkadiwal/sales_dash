import { useEffect, useState } from "react";
import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";
import { getOrders } from "../_lib/localStorage";

type order = {
  status: string;
}

type PieItem = {
  name: string;
  value: number;
}

export default function Donut() {
  const COLORS = ["#4ADE80 ", "#60A5FA", "#A78BFA", "  #F87171", "#FACC15"];
  const [data, setData] = useState<PieItem[] | null>(null);

  useEffect(() => {
    const orders = getOrders() as order[] | null;
    if(!orders) return;

    const statusCount: Record<string, number> = {};
    if (orders) {
      orders.forEach((order) => {
        const status = order.status || "unknown";
        statusCount[status] = (statusCount[status] || 0) + 1;
      });

      const chartData: PieItem[] = Object.keys(statusCount).map((status) => ({
        name: status,
        value: statusCount[status],
      }));

      setData(chartData);
    }
  }, []);
  return (
    <div>
        <h3 className="text-xl font-semibold text-center text-(--font-color)">Order Information</h3>
      {data && (
        <PieChart width={400} height={300}>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={110}
            paddingAngle={3}
          >
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      )}
    </div>
  );
}
