"use client";
import Link from "next/link";
import { BsBarChartFill } from "react-icons/bs";
import { FaBoxOpen, FaChartLine, FaArrowRight } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";

export default function AuthLanding() {
  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden">


      <div className="relative">
        <section className="px-6 py-16 md:py-24 lg:py-12">
          <div className="max-w-7xl mx-auto">
            <div className="text-center space-y-8 animate-fadeInUp">

              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-(--border-color) rounded-full shadow-sm">
                {/* <HiSparkles className="text-(--primary-btn)" /> */}
                <span className="text-sm font-semibold text-(--font-color)">
                  Sales Dashboard
                </span>
              </div>


              <div className="space-y-4">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-(--font-color) leading-tight">
                  Manage Orders.
                </h1>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-(--primary-btn) leading-tight">
                  Track Sales.
                </h1>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-(--font-color) leading-tight">
                  Scale Faster.
                </h1>
              </div>

              <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-600 leading-relaxed px-4">
                Real-time order tracking, intelligent analytics, and seamless management.
                Everything you need to supercharge your sales operations in one powerful platform.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Link
                  href="/auth/signUp"
                  className="group w-full border sm:w-auto bg-(--primary-btn) text-white px-7 py-3 rounded-xl font-semibold hover:bg-(--secondary-btn) transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2"
                >
                  Get Started
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/auth/signIn"
                  className="w-full sm:w-auto border-2 border-(--primary-btn) text-(--primary-btn) px-7 py-3 rounded-xl font-semibold hover:bg-(--primary-btn) hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Sign In
                </Link>
              </div>


            </div>
          </div>
        </section>

        <section className="px-6 py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto">

            <div className="text-center space-y-4 mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 border border-(--border-color) rounded-full">
                <span className="text-sm font-semibold text-(--primary-btn)">
                  🚀 Features
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-(--font-color)">
                Everything You Need
              </h2>
              <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-600">
                Powerful tools designed for modern sales teams. From order tracking to advanced analytics.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {[
                {
                  icon: <BsBarChartFill />,
                  title: "Real-Time Dashboard",
                  description: "Monitor your sales performance with live updates. Track orders, revenue, and key metrics at a glance.",
                  gradient: "from-blue-500 to-cyan-500"
                },
                {
                  icon: <FaBoxOpen />,
                  title: "Order Management",
                  description: "Create, update, and manage orders effortlessly. Streamlined workflow for maximum efficiency.",
                  gradient: "from-purple-500 to-pink-500"
                },
                {
                  icon: <FaChartLine />,
                  title: "Advanced Analytics",
                  description: "Weekly and monthly sales charts with deep insights. Identify trends and make data-driven decisions.",
                  gradient: "from-orange-500 to-red-500"
                },
                {
                  icon: <BsBarChartFill />,
                  title: "Top Products",
                  description: "Discover your best-performing products instantly. Optimize inventory and boost revenue.",
                  gradient: "from-green-500 to-emerald-500"
                },
                {
                  icon: <FaBoxOpen />,
                  title: "Multi-Role Access",
                  description: "Separate user and admin interfaces with customized permissions for your entire team.",
                  gradient: "from-indigo-500 to-purple-500"
                },
                {
                  icon: <FaChartLine />,
                  title: "Lightning Fast",
                  description: "Instant updates and blazing-fast performance. No lag, no waiting, just pure productivity.",
                  gradient: "from-yellow-500 to-orange-500"
                }
              ].map((feature, idx) => (
                <div
                  key={idx}
                  className="group bg-gray-50 p-8 rounded-2xl border border-(--border-color) hover:border-(--primary-btn) hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-linear-to-br ${feature.gradient} text-white text-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>

                  <h3 className="text-xl md:text-2xl font-semibold mb-3 text-(--font-color)">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>

                  <div className="mt-4 text-(--primary-btn) font-semibold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                    Learn more <FaArrowRight className="text-sm" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

    </div>
  );
}