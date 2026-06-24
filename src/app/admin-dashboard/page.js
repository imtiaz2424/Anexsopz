"use client";

import Link from "next/link";

import {
  useEffect,
  useState,
} from "react";

export default function AdminDashboard() {

  const [stats, setStats] =
    useState(null);

  useEffect(() => {

    fetch(
      "http://127.0.0.1:8000/api/dashboard-stats/"
    )
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
      });

  }, []);

  if (!stats) {
    return (
      <div className="p-10">
        Loading...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-5xl font-black mb-10">
        Admin Dashboard
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="bg-white p-8 rounded-3xl shadow">

          <h2 className="text-gray-500">
            Products
          </h2>

          <p className="text-5xl font-black mt-3">
            {stats.total_products}
          </p>

        </div>

        <div className="bg-white p-8 rounded-3xl shadow">

          <h2 className="text-gray-500">
            Users
          </h2>

          <p className="text-5xl font-black mt-3">
            {stats.total_users}
          </p>

        </div>

        <div className="bg-white p-8 rounded-3xl shadow">

          <h2 className="text-gray-500">
            Orders
          </h2>

          <p className="text-5xl font-black mt-3">
            {stats.total_orders}
          </p>

        </div>

        <div className="bg-white p-8 rounded-3xl shadow">

          <h2 className="text-gray-500">
            Revenue
          </h2>

          <p className="text-5xl font-black mt-3">
            $
            {stats.revenue}
          </p>

        </div>

      </div>

    </main>
  );
}