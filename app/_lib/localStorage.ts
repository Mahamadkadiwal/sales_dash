import { Order } from "../_types/order";
import { Product } from "../_types/Product";
import { Users } from "../_types/user";

export function getUsers(): Users[] {
    const userData = localStorage.getItem("users");
    return userData ? JSON.parse(userData): [];
}

export function getCurrentUser(): Users | null {
    const userData = localStorage.getItem("currentUser");
    return userData ? JSON.parse(userData): null;
}

export function getCurrentAdmin(): Users | null{
    const admin = localStorage.getItem("currentAdmin");
    return admin ? JSON.parse(admin): null;
}

export function saveUser(data: Users): void{
    const users = getUsers();
    if(users.find(user => user.email === data.email)){
        throw new Error("User with this email already exists");
    }
    users.push(data);
    localStorage.setItem("users", JSON.stringify(users));

}

export function authenticateUser(data: Users){
    const users = getUsers();

    const user = users.find(user => user.email === data.email && user.password === data.password);
    if(!user){
        throw new Error("Invalid email or password");
    }
    if(user.role !== data.role){
        throw new Error("User role mismatch");
    }
    if(user.role === "admin"){
        localStorage.setItem("currentAdmin", JSON.stringify(user));
    }
    else if(user.role === "user"){
        localStorage.setItem("currentUser", JSON.stringify(user));
    }
    return user;
}

export function getOrders(): Order[]{
    const orderData = localStorage.getItem("orders");
    if(!orderData) return [];
    const orders: Order[] =JSON.parse(orderData);
    return orders.sort((a, b) => 
    new Date(b.order_date).getTime() - new Date(a.order_date).getTime()
    );
}

export function addOrder(data: Order): void{
    const orders = getOrders();
    const id = String(orders.length+1);
    data.id = id;
    if(data == null){
        throw new Error("Invalid order data");
    }
    orders.push(data);
    localStorage.setItem("orders", JSON.stringify(orders));
}

export function editOrder(id: string, data: Partial<Order>): void{
    const orders = getOrders();
    const updatedOrders = orders.map(order => order.id === id ? {...order, ...data} : order);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
}

export function deleteOrder(id: string): void{
    const orders = getOrders().filter(order => order.id !== id);
    localStorage.setItem("orders", JSON.stringify(orders));
}

export function getProduct(): Product[]{
    try {
        const productData = localStorage.getItem("products");
        return productData ? JSON.parse(productData): [];
    } catch (error) {
        console.log("Error parsing product data:", error);
        return [];
    }
}

export function addProduct(data: Omit<Product, "id">): void{
    const products = getProduct();
    const id = String(products.length+1);
    const newProduct: Product = { ...data, id };
    products.push(newProduct);

    localStorage.setItem("products", JSON.stringify(products));
}

export function editProduct(id: string, data: Partial<Product>): Product[]
{
    try {
    const products = getProduct();
        const updatedProducts = products.map(product => 
            product.id === id ? {...product, ...data} : product
        );

        localStorage.setItem("products", JSON.stringify(updatedProducts));
        
        return updatedProducts;
} catch(err){
    console.log(err);
    return [];
}
}

export function deleteProduct(id: string): void {
    const products = getProduct().filter(product => product.id !== id);
    localStorage.setItem("products", JSON.stringify(products));
}

export function dashboardCountData() {
  const customers = getUsers().filter(u => u.role === "user").length;

  const totalOrders = getOrders();
  const totalIncome = totalOrders.reduce(
    (t, o) => t + Number(o.amount),
    0
  );

  const products = getProduct().length;

  return {
    customers,
    totalOrders: totalOrders.length,
    products,
    totalIncome
  };
}