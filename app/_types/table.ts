export interface TableColumn<T>{
    headers: string;
    key: keyof T | "actions";
    path?: string;
}

export interface TableProps<T extends { isNew?: boolean }>{
    data: T[];
    columns: TableColumn<T>[];
    renderCell?: (item: T, key: string, index: number) => React.ReactNode;
    onRowClick?: (item: T) => void;
}