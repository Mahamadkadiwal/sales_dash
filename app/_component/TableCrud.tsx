"use client";
import Image from "next/image";
import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline, MdDone, MdOutlineCancel } from "react-icons/md";
import { Column, TableCrudProps } from "../_types/tablecrud";
import Table from "./Table";

export default function TableCrud<T extends {id: string; isNew?: boolean}>({data, columns, showActions = true, onDelete, onSave}: TableCrudProps<T>) {
    const [editingRow, setEditingRow] = useState<T["id"] | null>(null);
    const [editData, setEditData]= useState<Partial<T>>({});

    const tableColumns: Column<T>[] = [
        ...columns,
        ...(showActions
            ? [{ headers: "Actions", key: "actions" as const }]
            : []
        ),
    ];

    function handleEditClick(item: T){
        setEditingRow(item.id);
        setEditData(item);
    }

    // function handleInputChange<k extends keyof T>(key:k, value: T[k]){
    //     setEditData(prev => ({...prev, [key]: value}));
    // }

    function handleInputChange<K extends keyof T>(key: K, value: T[K]) {
    setEditData(prev => ({...prev, [key]: value}));
}

    function saveRow(){
        if(!editingRow) return;
        onSave(editingRow, editData as T);
        setEditingRow(null);
        setEditData({});
    }

    function markAsSeen(row: T){
        if(!row.id) return ;
        if(row.isNew === false) return;
        const updatedRow = {...row, isNew: false};

        onSave(row.id, updatedRow);
    }

    function delelteRow(id: T["id"]){
        if(!onDelete) return
        if(confirm("Are you sure you want to delete this order?")){
            onDelete(id);
        }
    }

    const statusStyle: Record<string, string> = {
        Pending: "bg-yellow-100 text-yellow-700",
        Processing: "bg-blue-100 text-blue-700",
        Shipped: "bg-purple-100 text-purple-700",
        Delivered: "bg-green-100 text-green-700",
        Cancelled: "bg-red-100 text-red-700",
    };

    const renderCell = (item: T, key: string) => {
        const rowId = item.id;
        
        if(key === "actions" && showActions) {
            return editingRow === rowId ? (
                <div className="flex space-x-3">
                    <button onClick={(e) => {e.stopPropagation(); 
                        setEditingRow(null)}} className="p-2 text-(--table-data-font-color) rounded-full hover:bg-gray-200 transition-all duration-300 transform hover:scale-110"><MdOutlineCancel /></button>
                    <button onClick={(e) => {e.stopPropagation(); saveRow()}} className="p-2 text-(--table-data-font-color) rounded-full hover:bg-gray-200 transition-all duration-300 transform hover:scale-110"><MdDone /></button>
                </div>
                
            ) : (
                <div className="flex gap-2">
                    <button onClick={(e) => {e.stopPropagation(); handleEditClick(item)}} className="p-2 text-(--table-data-font-color) rounded-full hover:bg-gray-200 transition-all duration-300 transform hover:scale-105"><CiEdit /></button>
                    <button onClick={(e) => {e.stopPropagation(); delelteRow(item.id)}} className="p-2 text-(--table-data-font-color) rounded-full hover:bg-gray-200 transition-all duration-300 transform hover:scale-110"><MdDeleteOutline /></button>
                </div>
            )
        }

        if(editingRow === rowId){
            if(key === "description"){
                return (
                    <input type="text"
                    className="border px-2 py-1 rounded w-60"
                    value={editData[key] || ""}
                    onChange={(e) => handleInputChange(key, e.target.value)}
                    />
                )
            }
            if(key === "image"){
                return (
                    <input type="file"
                    onChange={(e) => {
                        const file = e.target.files?.[0];
                        if(file){
                            handleInputChange(key as keyof T,  ("/products/" + file.name) as T[keyof T]);
                        }
                    }}
                />
                )
            }
            if(key === "status"){
                return (
                    <select className="border px-2 py-1 rounded w-30" value={editData[key] || ""} onChange={(e) => handleInputChange(key, e.target.value)}>
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>
                )
            }
            if(key === "order_date"){
                return (
                    <input
                        className="border px-2 py-1 rounded w-30"
                        type="date"
                        value={editData[key] || ""}
                        onChange={(e) => handleInputChange(key, e.target.value)} 
                    />
                )
            }
            return (
                <input
                    className="border px-2 py-1 rounded w-30"
                    value={editData[key] || ""}
                    onChange={(e) => handleInputChange(key, e.target.value)} 
                />
            )
        }

        if(key === "image"){
            return (
                <Image src={item.image}
                alt={item.name}
                width={50}
                height={50}
                className="rounded object-cover"
                />
            )
        }

        if (key === "status") {
            return (
                <select
                className={`px-3 py-1 rounded-md text-sm ${statusStyle[item.status] || ""}`}
                value={item.status}
                onChange={(e) => {
                    const newStatus = e.target.value;

                    handleInputChange("status", newStatus);

                    onSave(item.id, { ...item, status: newStatus });

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


        return (item as any)[key];

    } 
  return (
    <Table data={data} renderCell={renderCell} columns={tableColumns} onRowClick={editingRow ? undefined : markAsSeen}  />
  )
}
