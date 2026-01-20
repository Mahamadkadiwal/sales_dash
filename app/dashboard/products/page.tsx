"use client";

import Input from "@/app/_component/Input";
import Modal from "@/app/_component/Modal";
import PageHeader from "@/app/_component/PageHeader";
import ProductTable from "@/app/_component/ProductTable";
import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { addProduct, getProduct } from "../../_lib/localStorage";
import { Product } from "@/app/_types/Product";
import { productData } from "@/app/_lib/ProductData";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ProductFormData, productSchema } from "@/app/Schema/Product";

export default function Page() {
    const [isOpen, setIsOpen] = useState<boolean>(false);


    const [products, setProduct] = useState<Product[]>([]);
      
      //const memoizedProducts = useMemo(() =>  getProduct(), []);
    
      const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
      } = useForm<ProductFormData>({
        resolver: zodResolver(productSchema),
        defaultValues: {
          name: "",
          description: "",
          price: "",
          image: "",
        },
      });

      const fetchProducts = useCallback(() => {
        const products = getProduct() as Product[];
        if(!products || products.length === 0){
          localStorage.setItem("products", JSON.stringify(productData()));
        }
        setProduct(products);
      },[]);

      useEffect(() => {
        fetchProducts();

      }, [fetchProducts]);

    function handleClick() {
    setIsOpen(!isOpen);
  }



  function onSubmit(data: ProductFormData) {
    try {
      addProduct(data);
      toast.success("Product added successfully");
      fetchProducts();
      setIsOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to add product");
    }
  }

    function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setValue("image", `/products/${file.name}`, {
      shouldValidate: true,
    });
  }

  return (
    <div className="bg-white min-h-screen p-2">
          <PageHeader title="Products" btnText="Add Products" onClick={handleClick} />
    
          <div className="mt-2">
            <ProductTable products={products} onRefresh={fetchProducts} />
          </div>
    
          <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Add Product">
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <Input
              type="text"
              placeholder="Product Name" 
              {...register("name")}
              error={errors.name?.message}
              />

              <Input placeholder="Product Description"
              {...register("description")}
              error={errors.description?.message}
              />

              <Input
              type="file"
              onChange={handleFileChange}
              error={errors.image?.message}
            />

              <Input placeholder="Product Price" 
              {...register("price")}
              error={errors.price?.message}
              type="number"
              />

              <button type="submit" className="primary-btn w-full">Add Product</button>
            </form>
          </Modal>
        </div>
  )
}
