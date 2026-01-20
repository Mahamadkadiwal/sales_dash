export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    id?: string;
    error?: string;
}


export type BaseRow = {
  id: string;
  isNew?: boolean;

  status?: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  image?: string;
  description?: string;
  order_date?: string;
};

export type Status =
  | "Pending"
  | "Processing"
  | "Shipped"
  | "Delivered"
  | "Cancelled";


