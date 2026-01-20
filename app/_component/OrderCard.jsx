"use client";
import Image from "next/image";

export default function OrderCard({ order }) {
  const statusStyle = {
    Pending: "bg-yellow-100 text-yellow-700",
    Processing: "bg-blue-100 text-blue-700",
    Shipped: "bg-purple-100 text-purple-700",
    Delivered: "bg-green-100 text-green-700",
    Cancelled: "bg-red-100 text-red-700",
  };

  return (
    <div className="flex justify-between items-center rounded-xl p-4 gap-4 bg-white border border-gray-200 shadow-sm hover:shadow-lg transition">

      
      <div className="w-24 h-24 flex items-center justify-center">
        <Image
          src={order.image}
          alt={order.product_name}
          width={100}
          height={100}
          className="object-cover rounded"
        />
      </div>

      <div className="flex flex-col flex-1">
        <h3 className="text-lg font-semibold text-(--font-color)">
          {order.product_name}
        </h3>
        <p className="text-gray-500 text-sm">
          {order.description}
        </p>
        <p className="text-lg font-bold text-green-600 mt-1">
          ₹ {order.amount}
        </p>
        <p className="text-gray-500 font-semibold">
          Ordered on: {order.order_date}
        </p>
      </div>

      <div>
        <span
          className={`px-4 py-2 rounded-full text-sm font-medium ${statusStyle[order.status]}`}
        >
          {order.status}
        </span>
      </div>
    </div>
  );
}