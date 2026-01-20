"use client";
import toast from "react-hot-toast";
import { deleteOrder, editOrder } from "../_lib/localStorage";
import { Order } from "../_types/order";
import TableCrud from "./TableCrud";

export default function   OrderTable({orders, onRefresh}: {orders: Order[], onRefresh?: () => void }) {

  if(!orders) return null;

  function handleSave(id: string, updatedRow: Order){
    try {
      editOrder(id, updatedRow);
      toast.success('Order updated successfully');
      onRefresh && onRefresh();
    } catch (error) {
      console.log(error);
      toast.error('Failed to update order');
    }

  }

  function handleDelete(order_id: string){
    try {
      deleteOrder(order_id);
      toast.success('Order deleted successfully');
      onRefresh && onRefresh();
    } catch (error) {
      console.log(error);
      toast.error('Failed to delete order');
    }
  }


  const columns = [
    { headers: "Customer Name", key: "customer_name" as keyof Order },
    { headers: "Product Name", key: "product_name" as keyof Order },
    { headers: "Amount", key: "amount" as keyof Order },
    { headers: "Order Date", key: "order_date" as keyof Order },
    { headers: "Status", key: "status" as keyof Order },
  ];

  if (!orders || orders.length === 0) return <div>No orders found</div>;
  
  return (
    <>
      <TableCrud<Order> data={orders} columns={columns} onSave={handleSave} onDelete={handleDelete} />
    </>
  );
}
