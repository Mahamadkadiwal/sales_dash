interface PageHeaderProps{
  title: string;
  btnText?: string;
  onClick?: () => void;
}
export default function PageHeader({title, btnText="", onClick}: PageHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-bold text-(--font-color)">{title}</h2>

        {btnText && <button onClick={onClick} className="primary-btn">{btnText}</button>}
    </div>
  )
}
