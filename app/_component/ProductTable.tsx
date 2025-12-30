import React, { useEffect, useMemo, useState } from 'react'
import { deleteProduct, editProduct, getProduct } from '../_lib/localStorage';
import TableCrud from './TableCrud';
import { productData } from '../_lib/ProductData';
import { Product } from '../_types/Product';
import { Column } from '../_types/tablecrud';
import toast from 'react-hot-toast';

export default function ProductTable() {
  const [products, setProduct] = useState<Product[]>([]);

 useEffect(() => {
  const load = () => setProduct(getProduct());

  load(); // initial load

  window.addEventListener("products-updated", load);

  return () => window.removeEventListener("products-updated", load);
}, []);

  if (!products || products.length === 0) return <div>No products found</div>;

  function handleSave(id: string, updatedRow: Product) {
   try{ 
    editProduct(id, updatedRow);
   // fetchProducts();
    setProduct(prev =>
      prev.map(p => p.id === id ? { ...p, ...updatedRow } : p)
    );
    toast.success('Product updated successfully');
  } catch(err){
    console.log('error',err);
    toast.error('Failed to update product');
  }
  }

  function handleDelete(id: string) {
    deleteProduct(id);
    // fetchProducts();
    setProduct(prev => prev.filter(p => p.id !== id));
  }

  // const orders1 = productData();

  // function addProduct(){
  //     localStorage.setItem("products", JSON.stringify(orders1));
  // }

  const columns: Column<Product>[] = [
    { headers: "Name", key: "name" as keyof Product },
    { headers: "Description", key: "description" as keyof Product },
    { headers: "Image", key: "image" as keyof Product },
    { headers: "Price", key: "price" as keyof Product },
  ];
  return (
    <>
      {/* <button onClick={addProduct}>Add</button> */}
      <TableCrud<Product> data={products} columns={columns} onSave={handleSave} onDelete={handleDelete} />
    </>

  )
}

