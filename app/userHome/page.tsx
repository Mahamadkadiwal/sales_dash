"use client";
import { useEffect, useState } from "react";
import { addOrder, getCurrentUser, getProduct } from "../_lib/localStorage";
import Image from "next/image";
import toast from "react-hot-toast";
import { Product } from "../_types/Product";
import { Order } from "../_types/order";

export default function Page() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const stored = getProduct() as Product[];
    setProducts(stored);
  }, []);

  function handleOrder(product: Product) {
    // alert(`Order placed for: ${product.name}`);
    const user = getCurrentUser();

    const data = {
      id: "",
      customer_name : user ? user.username : "Guest",
      product_name: product.name,
      amount: product.price,
      order_date: new Date().toISOString().split('T')[0],
      status: "Pending",
      isNew: true,
    };
    try{
      addOrder(data);
      toast.success("Order placed successfully");
    } catch (error) {
      console.log("error", error);
      toast.error("Failed to place order");
    }

  }

  return (
    <div className="min-h-full pt-2 pb-10 px-4 mx-30">
      <h2 className="text-2xl font-semibold text-(--font-color) mb-4">
        Available Products
      </h2>

      {products.length === 0 && (
        <p className="text-gray-500">No products available.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition p-4 flex items-center gap-4"
          >
            {/* Product Image */}
            <div className="w-28 h-28 flex items-center justify-center">
              <Image
                src={product.image}
                alt={product.name}
                width={100}
                height={100}
                className="h-full object-contain"
              />
            </div>

           
            <div className="flex flex-col flex-1">
              <h3 className="text-lg font-semibold text-gray-800">
                {product.name}
              </h3>

              <p className="text-gray-500 text-sm">{product.description}</p>

              <p className="text-xl font-bold text-gray-800 mt-1">
                ₹ {product.price}
              </p>

              <button onClick={() => handleOrder(product)}
               className="mt-2 primary-btn w-fit transition">
                Order Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
