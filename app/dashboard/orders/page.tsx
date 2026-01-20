"use client";

import { Order } from "@/app/_types/order";
import { Product } from "@/app/_types/Product";
import { OrderFormData, orderSchema } from "@/app/Schema/Order";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../../_component/Input";
import Modal from "../../_component/Modal";
import OrderTable from "../../_component/OrderTable";
import PageHeader from "../../_component/PageHeader";
import { addOrder, getOrders, getProduct } from "../../_lib/localStorage";
import toast from "react-hot-toast";

export default function page() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);

  const [orders, setOrders] = useState<Order[]>([]);
  
    const fetchOrders = useCallback(() => {
      const orders =  getOrders() as Order[];
      if(!orders) return;
      setOrders(orders);
    },[]);
  
    useEffect(() => {
      
      fetchOrders();
    }, [fetchOrders]);

  useEffect(() => {
    const productData = getProduct();
    setProducts(productData);
  }, []);

  const {
    register, 
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      id: "",
      customer_name: "",
      product_name: "",
      amount: "",
      order_date: "",
      status: "Pending",
      isNew: true,
    },
  });


  function onSubmit(data: OrderFormData) {
    try {
      addOrder(data);
      toast.success("Order added successfully");
      reset();
      fetchOrders();
      setIsOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to add order");
    }
  }


  function handleClick() {
    setIsOpen(!isOpen);
  }

  return (
    <div className="bg-white min-h-screen p-2">
      <PageHeader title="Orders" btnText="Add Order" onClick={handleClick} />

      <div className="mt-2">
        <OrderTable orders={orders} onRefresh={fetchOrders} />
      </div>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Add Order">
        <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
          <Input placeholder="Customer Name" 
          {...register("customer_name")} 
          id="customer_name"
          error={errors.customer_name?.message}
          />

          {/* <Input
            id="product_name"
            value={formData.product_name}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setFormData({ ...formData, product_name: e.target.value })
            }
            placeholder="Product Name"
          /> */}

          <div>
            <select
              className="input-field"
              {...register("product_name")}
            >
              <option value="">Select Product</option>
              {products.map(product => (
                <option key={product.id} value={product.name}>
                  {product.name}
                </option>
              ))}
            </select>
            {errors.product_name && (
              <p className="text-red-500 text-sm">
                {errors.product_name.message}
              </p>
            )}
          </div>

          <Input id="amount"
            {...register("amount")}
            error={errors.amount?.message}
             placeholder="Amount" />

          <Input
            id="order_date"
            type="date"
            {...register("order_date")}
            error={errors.order_date?.message}
            className=" text-(--font-color)"
            placeholder="Order Date"
          />

          <div>
            <select
              className="w-full text-(--font-color) border p-2 rounded"
              {...register("status")}
            >
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            {errors.status && (
              <p className="text-red-500 text-sm">
                {errors.status.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="primary-btn w-full transition"
          >
            Save Order
          </button>
        </form>
      </Modal>
    </div>
  );
}
