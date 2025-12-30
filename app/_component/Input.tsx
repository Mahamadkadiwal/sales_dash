import { InputProps } from "../_types/input";


export default function Input({label = "", id=
  "", type="text", error="", disabled=false, ...props}: InputProps) {
  return (
   <div className="flex flex-col mb-2">
    {label && <label htmlFor={id} className="text-md text-(--font-color) font-medium mb-1">
      {label}
    </label>}
    <div className="relative">
      <input
        id={id}
        type={type}
        disabled={disabled}
        {...props}
        className={`input-field
        ${error ? "border-red-500 focus:ring-red-500" : ""}  
        `}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
      />
    </div>
   </div>   
  )
}
