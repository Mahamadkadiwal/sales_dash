export interface Column<T>{
    headers: string;
    key: keyof T | "actions";
}

export interface TableCrudProps<T extends {id: string | number}>{
    data: T[];
    columns: Column<T>[];
    showActions?: boolean;
    onDelete?: (id: T["id"]) => void;
    onSave: (id: T["id"], updated: T) => void;
}