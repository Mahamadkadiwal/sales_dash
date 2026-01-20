"use client";

import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from "react";
import OrderTable from "../../_component/OrderTable";
import PageHeader from "../../_component/PageHeader";
import Modal from "../../_component/Modal";
import Input from "../../_component/Input";
import { addOrder, getOrders, getProduct } from "../../_lib/localStorage";
import { Order } from "@/app/_types/order";
import { Product } from "@/app/_types/Product";
import { Status } from "@/app/_types/input";

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

  const [formData, setFormData] = useState<Order>({
    id: "",
    customer_name: "",
    product_name: "",
    amount: "",
    order_date: "",
    status: "Pending",
    isNew: true,
  });


  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (
      !formData.customer_name ||
      !formData.product_name ||
      !formData.amount ||
      !formData.order_date
    ) {
      alert("Please fill all fields");
      return;
    }
    addOrder(formData);
    fetchOrders();
    setIsOpen(false);
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
        <form className="space-y-3" onSubmit={handleSubmit}>
          <Input placeholder="Customer Name" 
          value={formData.customer_name} id="customer_name"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setFormData({ ...formData, customer_name: e.target.value })
            } />

          {/* <Input
            id="product_name"
            value={formData.product_name}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setFormData({ ...formData, product_name: e.target.value })
            }
            placeholder="Product Name"
          /> */}

          <select className="input-field" 
          name="product" 
          value={formData.product_name}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => 
            setFormData ({ ...formData, product_name: e.target.value })
          }>
            <option value="">Select Product</option>
            {products.map((product) => (
              <option key={product.id} value={product.name}>{product.name}</option>
            ))}
          </select>

          <Input id="amount" value={formData.amount} onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setFormData({ ...formData, amount: e.target.value })
            } placeholder="Amount" />

          <Input
            id="order_date"
            type="date"
            value={formData.order_date}
            className=" text-(--font-color)"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setFormData({ ...formData, order_date: e.target.value })
            }
            placeholder="Order Date"
          />

          <select
            name="status"
            className="w-full text-(--font-color) border p-2 rounded"
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                setFormData({ ...formData, status: e.target.value as Status })
            }
            defaultValue="Pending"
          >
            <option>Pending</option>
            <option>Processing</option>
            <option>Shipped</option>
            <option>Delivered</option>
            <option>Cancelled</option>
          </select>

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
