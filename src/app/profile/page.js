"use client";

import { useState, useEffect, useContext } from "react";
import Link from "next/link";

import ProtectedRoute from "../../components/ProtectedRoute";
import { AuthContext } from "../../context/AuthContext";
import { CartContext } from "../../context/CartContext";
import { WishlistContext } from "../../context/WishlistContext";
import { OrderContext } from "../../context/OrderContext";

export default function ProfilePage() {
const { user, logout } =
useContext(AuthContext);

const { cart } =
useContext(CartContext);

const { wishlist } =
useContext(WishlistContext);

const { orders } =
useContext(OrderContext);

const [profile, setProfile] =
useState(null);

useEffect(() => {

  const userId =
    localStorage.getItem(
      "user_id"
    );

  if (!userId) return;

  fetch(
    "http://127.0.0.1:8000/api/profiles/"
  )
    .then((res) => res.json())
    .then((data) => {

      const userProfile =
        data.find(
          (p) =>
            p.user ===
            Number(userId)
        );

      if (userProfile) {
        setProfile(
          userProfile
        );
      }

    });

}, []);



return ( <ProtectedRoute>

  <main className="min-h-screen bg-gray-100 p-10">

    <div className="max-w-5xl mx-auto">

      <div className="bg-white rounded-3xl shadow-lg p-10">

        <div className="flex flex-col md:flex-row items-center gap-8 mb-10">

          <div className="w-32 h-32 rounded-full overflow-hidden bg-violet-600 shadow-lg">

            {profile?.image ? (

              <img
                src={
                  profile.image.startsWith(
                    "http"
                  )
                    ? profile.image
                    : `http://127.0.0.1:8000${profile.image}`
                }
                alt="Profile"
                className="w-full h-full object-cover"
              />

            ) : (

              <div className="w-full h-full flex items-center justify-center">

                <span className="text-white text-5xl font-black">

                  {user?.username
                    ?.charAt(0)
                    ?.toUpperCase()}

                </span>

              </div>

            )}

          </div>

          <div>

            <h1 className="text-5xl font-black">

              {user?.username}

            </h1>

            <p className="text-gray-500 text-lg mt-2">

              {user?.email}

            </p>

          </div>

        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-10">

          <div className="bg-violet-100 p-6 rounded-2xl">

            <h3 className="text-gray-600">
              Total Orders
            </h3>

            <p className="text-4xl font-black mt-2">

              {orders?.length || 0}

            </p>

          </div>

          <div className="bg-pink-100 p-6 rounded-2xl">

            <h3 className="text-gray-600">
              Wishlist Items
            </h3>

            <p className="text-4xl font-black mt-2">

              {wishlist?.length || 0}

            </p>

          </div>

          <div className="bg-blue-100 p-6 rounded-2xl">

            <h3 className="text-gray-600">
              Cart Items
            </h3>

            <p className="text-4xl font-black mt-2">

              {cart?.length || 0}

            </p>

          </div>

        </div>

        <div className="bg-gray-50 p-8 rounded-2xl">

          <h2 className="text-2xl font-black mb-6">

            Account Information

          </h2>

          <div className="space-y-5">

            <div>

              <p className="text-gray-500">
                Username
              </p>

              <h3 className="text-2xl font-bold">

                {user?.username}

              </h3>

            </div>

            <div>

              <p className="text-gray-500">
                Email
              </p>

              <h3 className="text-2xl font-bold">

                {user?.email}

              </h3>

            </div>

            <div>

              <p className="text-gray-500">
                User ID
              </p>

              <h3 className="text-2xl font-bold">

                {user?.id}

              </h3>

            </div>

          </div>

        </div>

        <div className="mt-10">

          <h2 className="text-2xl font-black mb-5">

            Quick Actions

          </h2>

          <div className="flex flex-wrap gap-4">

            <Link
              href="/orders"
              className="bg-black text-white px-6 py-3 rounded-xl"
            >
              My Orders
            </Link>

            <Link
              href="/wishlist"
              className="bg-pink-500 text-white px-6 py-3 rounded-xl"
            >
              Wishlist
            </Link>

            <Link
              href="/cart"
              className="bg-blue-500 text-white px-6 py-3 rounded-xl"
            >
              Cart
            </Link>

            <Link
              href="/admin-dashboard"
              className="bg-violet-600 text-white px-6 py-3 rounded-xl"
            >
              Dashboard
            </Link>

            <Link
              href="/profile/edit"
              className="bg-green-600 text-white px-6 py-3 rounded-xl"
            >
              Edit Profile
            </Link>

            <button
              onClick={logout}
              className="bg-red-500 text-white px-6 py-3 rounded-xl"
            >
              Logout
            </button>

          </div>

        </div>

      </div>

    </div>

  </main>

</ProtectedRoute>


);
}
