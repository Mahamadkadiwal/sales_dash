import React, { useEffect, useMemo, useState } from 'react'
import { deleteProduct, editProduct, getProduct } from '../_lib/localStorage';
import TableCrud from './TableCrud';
import { productData } from '../_lib/ProductData';
import { Product } from '../_types/Product';
import { Column } from '../_types/tablecrud';
import toast from 'react-hot-toast';

export default function ProductTable() {
  const [products, setProduct] = useState<Product[]>([]);
  console.log(products)
  //const memoizedProducts = useMemo(() =>  getProduct(), []);

  useEffect(() => {
  const load = () => setProduct(getProduct());

  load();

  window.addEventListener("products-updated", load);

  return () => window.removeEventListener("products-updated", load);
}, []);

  if (!products) return <div>Loading...</div>;

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

  const orders1 = productData();

  function addProduct(){
      localStorage.setItem("products", JSON.stringify(orders1));
      window.dispatchEvent(new Event("products-updated"));
  }

  const columns: Column<Product>[] = [
    { headers: "Name", key: "name" as keyof Product },
    { headers: "Description", key: "description" as keyof Product },
    { headers: "Image", key: "image" as keyof Product },
    { headers: "Price", key: "price" as keyof Product },
  ];
  return (
    <>
      {products.length === 0 && <button onClick={addProduct} className='m-3 primary-btn'>Add Product to Localhost</button>}
      <TableCrud<Product> data={products} columns={columns} onSave={handleSave} onDelete={handleDelete} />
    </>

  )
}
