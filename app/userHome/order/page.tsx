"use client";
import { useEffect, useState } from "react";
import OrderCard from "../../_component/OrderCard";
import { getCurrentUser, getOrders, getProduct } from "../../_lib/localStorage";
import { Order } from "@/app/_types/order";
import { User } from "@/app/_types/user";


export default function Page() {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [orders, setOrders] = useState<(Order & {
      image?: string;
      description?: string;
    })[]>([]);
    
    useEffect(() => {
        const userData = getCurrentUser() as User | null;

        if(userData && userData.role === "user"){
            setCurrentUser(userData);

            const allOrders = getOrders() || [];
            const allProducts = getProduct() || [];

            const userOrders = allOrders.filter(order => order.customer_name === userData.username);

            const productwithOrder = userOrders.map(order => {
                const product = allProducts.find(
                    p => p.name === order.product_name
                );

                return {
                    ...order,
                    image: product?.image || "",
                    description: product?.description || "",
                };
                });

               
            setOrders(productwithOrder);

            
           
        }
        
    },[]);
//   const orders = [
//     {
//       id: 1,
//       name: "Samsung Galaxy A55",
//       description: "Powerful smartphone with Super AMOLED display",
//       price: 24999,
//       status: "Delivered",
//       image: "/products/samsunga55.webp"
//     },
//   ];

  return (
    <div className="min-h-full pt-2 pb-10 px-4 mx-30">
      <h2 className="text-2xl font-semibold text-(--font-color) mb-4">
        My Orders
      </h2>

      {orders.length === 0 && (
        <p className="text-gray-500">No orders yet.</p>
      )}

      <div className="flex flex-col gap-4">
        {orders.map(order => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}