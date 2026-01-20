export interface TableColumn<T>{
    headers: string;
    key: keyof T | "actions";
    path?: string;
}

export interface TableProps<T>{
    data: T[];  
    columns: TableColumn<T>[];
    renderCell?: (item: T, key: keyof T | "actions", index: number) => React.ReactNode;
    onRowClick?: (item: T) => void;
}

export type PropertyKey = string | number | symbol;