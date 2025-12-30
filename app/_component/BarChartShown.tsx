import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from "recharts";
import { getOrders } from "../_lib/localStorage";

type BarData = {
  name: string;
  orders: number;
}

type Order = {
  product_name: string;
}

export default function BarChartShown() {
    const [data, setData] = useState<BarData[] | null>(null);

    useEffect(() => {
      const orders = (getOrders() as Order[]) || [] ;

      const productCount: Record<string, number> = {};

      orders.forEach((order) => {
        const product = order.product_name || "unknown";

        productCount[product] = (productCount[product] || 0) + 1;
      })

      const barData = Object.entries(productCount)
      .map(([name, orders]) => ({ name, orders }))
      .sort((a, b) => b.orders - a.orders)
      .slice(0, 5);

      setData(barData);
    },[])
  return (
    <div>
      <h3 className="text-xl font-semibold text-center text-(--font-color)">Top 5 Products</h3>
        {data && <BarChart
          width={450}
          height={300}
          data={data}
          margin={{ top: 10, right: 20, left: 10, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />

          <Bar
            dataKey="orders"
            fill="#4F46E5"
            radius={[6, 6, 0, 0]}
          />
        </BarChart>}
    </div>
  )
}
