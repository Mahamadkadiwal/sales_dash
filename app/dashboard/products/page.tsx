"use client";

import Input from "@/app/_component/Input";
import Modal from "@/app/_component/Modal";
import PageHeader from "@/app/_component/PageHeader";
import ProductTable from "@/app/_component/ProductTable";
import { ChangeEvent, FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { addProduct } from "../../_lib/localStorage";
import { Product } from "@/app/_types/Product";

export default function Page() {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const [formData, setFormData] = useState<Product>({
      id: "",
      name: "",
      description: "",
      image: "",
      price: "",
      isNew: true,
    });

    function handleClick() {
    setIsOpen(!isOpen);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
      e.preventDefault();
  
      if (
        !formData.name ||
        !formData.description ||
        !formData.image || 
        !formData.price
      ) {
        toast.error("Please fill all fields");
        return;
      }
      try {
        addProduct(formData);
        toast.success("Product added successfully");
      } catch(error){
        console.log('error', error);
        toast.error("Failed to add product");
      }
      setIsOpen(false);
    }

    function handleFileChange(e: ChangeEvent<HTMLInputElement>){
      const file = e.target.files?.[0];
      if(!file) return;
      setFormData({
        ...formData,
        image: "/products/" + file.name
      });
    }
  return (
    <div className="bg-white min-h-screen p-2">
          <PageHeader title="Products" btnText="Add Products" onClick={handleClick} />
    
          <div className="mt-2">
            <ProductTable />
          </div>
    
          <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Add Product">
            <form className="space-y-3" onSubmit={handleSubmit}>
              <Input
              type="text"
              placeholder="Product Name" 
              value={formData.name}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({
                ...formData, name: e.target.value
              })}
              />

              <Input placeholder="Product Description"
              value={formData.description}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({
                ...formData, description: e.target.value
              })}
              />

              <Input
              type="file"
              onChange={handleFileChange}
            />

              <Input placeholder="Product Price" 
              value={formData.price}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({
                ...formData, price: e.target.value
              })}
              type="number"
              />

              <button type="submit" className="primary-btn w-full">Add Product</button>
            </form>
          </Modal>
        </div>
  )
}
