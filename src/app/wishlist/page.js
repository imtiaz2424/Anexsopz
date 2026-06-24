"use client";

import { useContext, useEffect } from "react";
import Link from "next/link";
import { WishlistContext, } from "../../context/WishlistContext";
import ProtectedRoute from "../../components/ProtectedRoute";

export default function WishlistPage() {

  const {wishlist, setWishlist,} = useContext(WishlistContext);

  useEffect(() => {

  const userId =
    localStorage.getItem("user_id");

  if (!userId) return;

  fetch(
    `http://127.0.0.1:8000/api/wishlist/?user=${userId}`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      setWishlist(data);
    });

}, []);


  return (
    <ProtectedRoute>
    <main className="min-h-screen bg-gray-100 p-8">
      
      <div className="max-w-7xl mx-auto">
        {/* Top */}

        <Link
          href="/"
          className="inline-block mb-10 bg-black text-white px-6 py-3 rounded-2xl hover:bg-gray-800 transition"
        >
          ← Back To Home
        </Link>

        <h1 className="text-5xl font-black mb-10">
          My Wishlist ❤️
        </h1>

        {wishlist.length === 0 ? (

          <div className="bg-white p-10 rounded-3xl">

            <h2 className="text-3xl font-bold">
              Wishlist Empty
            </h2>

          </div>

        ) : (

          <div className="grid md:grid-cols-3 gap-8">

            {wishlist.map(
              (product) => (

                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                >

                  <div className="bg-white rounded-3xl overflow-hidden shadow-lg">

                    <img
                      src={product.product_image}
                      alt={product.product_name}
                      className="w-full h-72 object-cover"
                    />

                    <div className="p-5">

                      <h2 className="text-2xl font-bold">
                        {product.product_name}
                      </h2>

                      <p className="text-3xl font-black mt-2">
                        ${product.product_price}
                      </p>

                    </div>

                  </div>

                </Link>

              )
            )}

          </div>

        )}

      </div>

    </main>
    </ProtectedRoute>
  );
}