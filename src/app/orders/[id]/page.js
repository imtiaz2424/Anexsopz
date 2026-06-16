"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import ProtectedRoute from "../../../components/ProtectedRoute";

export default function OrderDetailsPage() {
  const params = useParams();

  const [items, setItems] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    if (!params?.id) return;

    fetch(
      `http://127.0.0.1:8000/api/order-items/?order=${params.id}`
    )
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });

  }, [params?.id]);

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-gray-100 p-10">

        <div className="max-w-6xl mx-auto">

          <Link
            href="/orders"
            className="inline-block mb-8 bg-black text-white px-6 py-3 rounded-xl"
          >
            ← Back To Orders
          </Link>

          <h1 className="text-4xl font-black mb-10">
            Order Details
          </h1>

          {loading ? (

            <div className="bg-white p-8 rounded-3xl shadow">
              Loading...
            </div>

          ) : items.length === 0 ? (

            <div className="bg-white p-8 rounded-3xl shadow">
              No Products Found
            </div>

          ) : (

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

              {items.map((item) => (

                <div
                  key={item.id}
                  className="bg-white rounded-3xl overflow-hidden shadow-lg"
                >

                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.product_name}
                      className="w-full h-64 object-cover"
                    />
                  )}

                  <div className="p-6">

                    <h2 className="text-2xl font-bold">
                      {item.product_name}
                    </h2>

                    <p className="mt-3">
                      Price:
                      <span className="font-bold ml-2">
                        ${item.price}
                      </span>
                    </p>

                    <p>
                      Quantity:
                      <span className="font-bold ml-2">
                        {item.quantity}
                      </span>
                    </p>

                    <p className="text-2xl font-black mt-4">
                      $
                      {Number(item.price) *
                        Number(item.quantity)}
                    </p>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </main>
    </ProtectedRoute>
  );
}