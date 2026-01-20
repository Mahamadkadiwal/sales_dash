import toast from 'react-hot-toast';
import { deleteProduct, editProduct } from '../_lib/localStorage';
import { Product } from '../_types/Product';
import { Column } from '../_types/tablecrud';
import TableCrud from './TableCrud';

export default function ProductTable({ products, onRefresh }: { products?: Product[], onRefresh?: () => void }) {


  if (!products) return <div>Loading...</div>;

  function handleSave(id: string, updatedRow: Product) {
    try {
      editProduct(id, updatedRow);
      onRefresh && onRefresh();
      toast.success('Product updated successfully');
    } catch (err) {
      console.log('error', err);
      toast.error('Failed to update product');
    }
  }

  function handleDelete(id: string) {
    try {
      deleteProduct(id);
      // fetchProducts();
      onRefresh && onRefresh();
      toast.success('Product deleted successfully');
    } catch (error) {
      console.log(error);
      toast.error('Failed to delete product');
    }
  }



  const columns: Column<Product>[] = [
    { headers: "Name", key: "name" as keyof Product },
    { headers: "Description", key: "description" as keyof Product },
    { headers: "Image", key: "image" as keyof Product },
    { headers: "Price", key: "price" as keyof Product },
  ];
  return (
    <>

      <TableCrud<Product> data={products} columns={columns} onSave={handleSave} onDelete={handleDelete} />
    </>

  )
}
