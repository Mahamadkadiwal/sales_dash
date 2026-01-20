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

export function isRenderable(value: unknown): value is React.ReactNode {
  return (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean" ||
    value === null ||
    value === undefined
  );
}
