import { Status } from "./input";

export interface Order  {
    id: string;
    customer_name: string;
    product_name: string;
    amount: string;
    order_date: string;
    status: Status;
    isNew?: boolean;
}