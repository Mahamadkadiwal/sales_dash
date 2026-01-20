"use client";
import Image from "next/image";
import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline, MdDone, MdOutlineCancel } from "react-icons/md";
import { Column, isRenderable, TableCrudProps } from "../_types/tablecrud";
import Table from "./Table";
import { BaseRow, Status } from "../_types/input";


export default function TableCrud<T extends BaseRow>({ data, columns, showActions = true, onDelete, onSave }: TableCrudProps<T>) {
    const [editingRow, setEditingRow] = useState<T["id"] | null>(null);
    const [editData, setEditData] = useState<Partial<T>>({});

    const [confirmDeleteId, setConfirmDeleteId] = useState<T["id"] | null>(null);

    const tableColumns: Column<T>[] = [
        ...columns,
        ...(showActions
            ? [{ headers: "Actions", key: "actions" as const }]
            : []
        ),
    ];

    function handleEditClick(item: T) {
        setEditingRow(item.id);
        setEditData(item);
    }

    function handleInputChange<K extends keyof T>(key: K, value: T[K]) {
        setEditData(prev => ({ ...prev, [key]: value }));
    }

    function updateField<K extends keyof T>(
        key: K,
        value: T[K]
    ) {
        setEditData(prev => ({ ...prev, [key]: value }));
    }


    function saveRow() {
        if (!editingRow) return;
        onSave(editingRow, editData as T);
        setEditingRow(null);
        setEditData({});
    }

    function markAsSeen(row: T) {
        if (!row.id) return;
        if (row.isNew === false) return;
        const updatedRow = { ...row, isNew: false };

        onSave(row.id, updatedRow);
    }

    function deleteRow(id: T["id"]) {
        if (!onDelete) return;
        onDelete(id);
        setConfirmDeleteId(null);
    }


    const statusStyle: Record<Status, string> = {
        Pending: "bg-yellow-100 text-yellow-700",
        Processing: "bg-blue-100 text-blue-700",
        Shipped: "bg-purple-100 text-purple-700",
        Delivered: "bg-green-100 text-green-700",
        Cancelled: "bg-red-100 text-red-700",
    };


    function isDataKey(key: PropertyKey): key is Extract<keyof T, string> {
        return key !== "actions";
    }

    const renderCell = (item: T, key: keyof T | "actions", index: number) => {
        const rowId = item.id;

        if (key === "actions" && showActions) {
            return editingRow === rowId ? (
                <div className="flex space-x-3">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setEditingRow(null);
                        }}
                        className="p-2 text-sm bg-gray-200 rounded-full hover:bg-gray-300"
                    >
                        <MdOutlineCancel />
                    </button>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            saveRow();
                        }}
                        className="p-2 rounded-full text-white bg-yellow-400 hover:bg-yellow-500"
                    >
                        <MdDone />
                    </button>
                </div>
            ) : confirmDeleteId === item.id ? (
                <div className="flex gap-2">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            deleteRow(item.id);
                        }}
                        className="p-2 text-sm bg-red-600 text-white rounded-full hover:bg-red-700"
                    >
                        <MdDone />
                    </button>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setConfirmDeleteId(null);
                        }}
                        className="p-2 text-sm bg-gray-200 rounded-full hover:bg-gray-300"
                    >
                        <MdOutlineCancel />
                    </button>
                </div>
            ) : (
                <div className="flex gap-2">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleEditClick(item);
                        }}
                        className="p-2 rounded-full hover:bg-gray-200"
                    >
                        <CiEdit />
                    </button>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setConfirmDeleteId(item.id);
                        }}
                        className="p-2 rounded-full hover:bg-gray-200"
                    >
                        <MdDeleteOutline />
                    </button>
                </div>
            );
        }


        // edit mode
        if (editingRow === rowId && isDataKey(key)) {
            const value = (editData[key]) ?? "";
            if (key === "description" && typeof value === "string") {
                return (
                    <input
                        className="border px-2 py-1 rounded w-30"
                        value={value}
                        onChange={(e) => updateField(key as keyof T, e.target.value as T[keyof T])}
                    />
                );
            }
            if (key === "image") {
                return (
                    <input type="file"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                                updateField(
                                    "image" as Extract<keyof T, "image">,
                                    `/products/${file.name}` as T["image"]
                                );
                            }
                        }}
                    />
                )
            }
            if (key === "status") {
                return (
                    <select className={`px-3 py-1 rounded-md text-sm ${statusStyle[item.status as Status] || ""}`} value={item.status}
                        onChange={(e) =>
                            updateField(
                                "status" as Extract<keyof T, "status">,
                                e.target.value as Status
                            )
                        }
                    >
                        <option className={`${statusStyle["Pending"] || ""}`} value="Pending">Pending</option>
                        <option className={`${statusStyle["Processing"] || ""}`} value="Processing">Processing</option>
                        <option className={`${statusStyle["Shipped"] || ""}`} value="Shipped">Shipped</option>
                        <option className={`${statusStyle["Delivered"] || ""}`} value="Delivered">Delivered</option>
                        <option className={`${statusStyle["Cancelled"] || ""}`} value="Cancelled">Cancelled</option>
                    </select>
                )
            }
            if (key === "order_date") {
                return (
                    <input
                        className="border px-2 py-1 rounded w-30"
                        type="date"
                        value={String(value)}
                        onChange={(e) => updateField(key as keyof T, e.target.value as T[keyof T])}
                    />
                )
            }
            return (
                <input
                    className="border px-2 py-1 rounded w-30"
                    value={String(value)}
                    onChange={(e) => updateField(key as keyof T, e.target.value as T[keyof T])}
                />
            )
        }

        // normal mode
        if (key === "image" && item.image) {
            return (
                <Image src={item.image}
                    alt={"image"}
                    width={50}
                    height={50}
                    className="rounded object-cover"
                />
            )
        }

        if (key === "status") {
            return (
                <select
                    className={`px-3 py-1 rounded-md text-sm ${statusStyle[item.status as Status] || ""}`}
                    value={item.status || "Pending"}
                    onChange={(e) => {
                        const newStatus = e.target.value;

                        handleInputChange(
                            "status" as Extract<keyof T, "status">,
                            newStatus as T[Extract<keyof T, "status">]
                        );

                        onSave(item.id, {
                            ...item,
                            status: newStatus as T["status"],
                        });

                        setEditingRow(null);
                    }}
                >
                    <option className={`${statusStyle["Pending"] || ""}`} value="Pending">Pending</option>
                    <option className={`${statusStyle["Processing"] || ""}`} value="Processing">Processing</option>
                    <option className={`${statusStyle["Shipped"] || ""}`} value="Shipped">Shipped</option>
                    <option className={`${statusStyle["Delivered"] || ""}`} value="Delivered">Delivered</option>
                    <option className={`${statusStyle["Cancelled"] || ""}`} value="Cancelled">Cancelled</option>
                </select>
            );
        }


        if (key !== "actions") {
            const value = item[key];

            if (isRenderable(value)) {
                return value;
            }

            return String(value);
        }

        return null;


    }

    return (
        <Table data={data} renderCell={renderCell} columns={tableColumns} onRowClick={editingRow ? undefined : markAsSeen} />
    )
}
