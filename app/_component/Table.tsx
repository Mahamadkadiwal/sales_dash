import { TableProps } from '../_types/table'

export default function Table<T extends {isNew?: boolean}>({data, columns, renderCell, onRowClick }: TableProps<T>) {


  return (
    <table className='overflow-x-auto mt-2 w-full rounded-lg'>
        <thead className='bg-(--table-bg)'>
            <tr>
                {columns.map((col) => (
                    <th key={col.key as string} className="px-4 py-2 text-left text-md text-(--table-header-font-color) border-b border-(--border-color)">{col.headers}</th>
                ))}
            </tr>
        </thead>
        <tbody>
            {data.map((row, rowIndex) => (
                <tr key={rowIndex} className={`hover:bg-(--table-row-hover-bg) transition-colors ${row.isNew ? 'bg-(--table-new-row-bg)' : ''} `}
                onClick={() => onRowClick?.(row)}
                >
                    {columns.map((col) => ( 
                        <td key={String(col.key)} className="px-4 py-2 text-sm
                        text-(--table-data-font-color) border-b border-(--border-color)">
                            {renderCell
                            ? renderCell(row, col.key, rowIndex)
                            : col.key === "actions"
                            ? null
                            : String(row[col.key])}
                     </td>
                    ))}
                </tr>
            ))}
        </tbody>
    </table>
  )
}
