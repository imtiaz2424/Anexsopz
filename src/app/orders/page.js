"use client";

import {
  useEffect,
  useState,
  useContext,
} from "react";

import Link from "next/link";

import { AuthContext } from "../../context/AuthContext";
import ProtectedRoute from "../../components/ProtectedRoute";

export default function OrdersPage() {
  const { isLoggedIn } =
    useContext(AuthContext);

  const [orders, setOrders] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const userId =
      localStorage.getItem("user_id");

    if (!userId) {
      setLoading(false);
      return;
    }

    fetch(
      `http://127.0.0.1:8000/api/orders/?user=${userId}`
    )
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-gray-100 p-10">

        <div className="max-w-5xl mx-auto">

          <Link
            href="/"
            className="inline-block mb-8 bg-black text-white px-6 py-3 rounded-xl"
          >
            ← Back Home
          </Link>

          <h1 className="text-4xl font-black mb-8">
            📦 My Orders
          </h1>

          {loading ? (
            <div className="bg-white p-8 rounded-3xl shadow">
              Loading...
            </div>
          ) : orders.length === 0 ? (
            <div className="bg-white p-8 rounded-3xl shadow">
              No Orders Found
            </div>
          ) : (
            <div className="space-y-6">

              {orders.map((order) => (

                <Link
                  key={order.id}
                  href={`/orders/${order.id}`}
                >

                  <div className="bg-white p-6 rounded-3xl shadow-lg hover:shadow-xl transition cursor-pointer">

                    <h2 className="text-2xl font-bold">
                      {order.title || `Order #${order.id}`}
                    </h2>

                    <p className="text-gray-500 mt-2">
                      {new Date(
                        order.created_at
                      ).toLocaleString()}
                    </p>

                    <p className="text-3xl font-black mt-4">
                      ${order.total_price}
                    </p>

                    <p className="mt-2">
                      Status:
                      <span className="ml-2 font-bold text-green-600">
                        {order.status || "Pending"}
                      </span>
                    </p>

                  </div>

                </Link>

              ))}

            </div>
          )}

        </div>

      </main>
    </ProtectedRoute>
  );
}