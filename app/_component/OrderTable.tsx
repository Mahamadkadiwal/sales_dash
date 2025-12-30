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
    { header: "Customer Name", key: "customer_name" },
    { header: "Product Name", key: "product_name" },
    { header: "Amount", key: "amount" },
    { header: "Order Date", key: "order_date" },
    { header: "Status", key: "status" },
  ];

  if (!orders.length) return <div>Loading...</div>;
  return (
    <>
    {/* <button onClick={handlesave}>Ad</button> */}
      <TableCrud<Order> data={orders} columns={columns} onSave={handleSave} onDelete={handleDelete} showActions={false} />
    </>
  );
}

