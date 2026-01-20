"use client";
import { useRouter } from 'next/navigation';
import { DashboardData } from '../_lib/Types';

type props ={
  data: DashboardData;
}
export default function DashboardCard({data}: props) {
  const router = useRouter();
    const cards = [
    {
      title: "Total Orders",
      value: data.totalOrders,
      color: "bg-white",
      hoverColor: "hover:border-white hover:bg-white",
      path: "/dashboard/orders",
      change: "+12%",
      changeType: "increase"
    },
    {
      title: "Products",
      value: data.products,
      color: "bg-white",
      hoverColor: "hover:border-white hover:bg-white",
      path: "/dashboard/products",
      change: "+8%",
      changeType: "increase"
    },
    {
      title: "Customers",
      value: data.customers,
      color: "bg-white",
      hoverColor: "hover:border-white hover:bg-white",
      path: "/dashboard/customers",
      change: "+15%",
      changeType: "increase"
    },
    {
      title: "Total Income",
      value: `₹${data.totalIncome?.toLocaleString('en-IN')}`,
      color: "bg-white",
      hoverColor: "hover:border-white hover:bg-white",
      path: "/dashboard/income",
      change: "+22%",
      changeType: "increase"
    },
  ];

  function handleClick(path: string){
    router.push(path);
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
      {cards.map((card, index) => (
        <div
          key={index}
          onClick={() => handleClick(card.path)}
          className={`${card.color} p-6 rounded-xl shadow-md flex flex-col cursor-pointer border-2 border-transparent transition-all duration-300 hover:shadow-xl ${card.hoverColor} transform hover:scale-105 hover:-translate-y-1`}
          style={{
            animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`
          }}
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">{card.title}</p>
              
                <h3 className="text-3xl font-bold text-(--font-color)">{card.value}</h3>
              
            </div>
            {/* {card.icon} */}
          </div>
          
          
            <div className="flex items-center text-sm">
              <span className={`font-semibold ${card.changeType === 'increase' ? 'text-green-600' : 'text-red-600'}`}>
                {card.change}
              </span>
              <span className="text-gray-500 ml-1"> last week</span>
            </div>
          
        </div>
      ))}
    </div>
  )
}
