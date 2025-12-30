export function orderData(){
    const orders = [
  {
    id: 1,
    customer_name: "Amit Sharma",
    product_name: "Smartphone",
    amount: 24500,
    order_date: "2025-02-10",
    status: "Delivered"
  },
  {
    id: 2,
    customer_name: "Priya Patel",
    product_name: "Bluetooth Headphones",
    amount: 3200,
    order_date: "2025-02-09",
    status: "Pending"
  },
  {
    id: 3,
    customer_name: "Rahul Verma",
    product_name: "Laptop",
    amount: 58999,
    order_date: "2025-02-08",
    status: "Shipped"
  },
  {
    id: 4,
    customer_name: "Neha Gupta",
    product_name: "Smart Watch",
    amount: 8999,
    order_date: "2025-02-07",
    status: "Cancelled"
  },
  {
    id: 5,
    customer_name: "Rohan Mehta",
    product_name: "AC - Split 1.5 Ton",
    amount: 42999,
    order_date: "2025-02-06",
    status: "Pending"
  }
];
return orders;
}