"use client";
import { useCallback, useEffect, useEffectEvent, useState } from "react";
import { deleteOrder, editOrder, getOrders } from "../_lib/localStorage";
import { Order } from "../_types/order";
import TableCrud from "./TableCrud";

export default function OrderTable() {
  const [orders, setOrders] = useState<Order[]>([]);

  const fetchOrders = useCallback(() => {
    const orders =  getOrders() as Order[];
    if(!orders) return;
    setOrders(orders);
  },[]);

  useEffect(() => {
    
    fetchOrders();
  }, [fetchOrders]);

  if(!orders) return null;

  
  function handleSave(id: string, updatedRow: Order){
    editOrder(id, updatedRow);
    fetchOrders();
  }

  function handleDelete(order_id: string){
    deleteOrder(order_id);
    fetchOrders();
  }

//   const orders1 = orderData();

//   function handlesave(){
//       localStorage.setItem("orders", JSON.stringify(orders1));
//   }

  const columns = [
    { headers: "Customer Name", key: "customer_name" as keyof Order },
    { headers: "Product Name", key: "product_name" as keyof Order },
    { headers: "Amount", key: "amount" as keyof Order },
    { headers: "Order Date", key: "order_date" as keyof Order },
    { headers: "Status", key: "status" as keyof Order },
  ];

  if (!orders.length) return <div>Loading...</div>;
  if(orders.length === 0) return <div>No orders found.</div>;
  return (
    <>
    {/* <button onClick={handlesave}>Ad</button> */}
      <TableCrud<Order> data={orders} columns={columns} onSave={handleSave} onDelete={handleDelete} showActions={false} />
    </>
  );
}

