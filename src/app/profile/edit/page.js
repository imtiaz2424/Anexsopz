"use client";

import { useContext, useState } from "react";
import { useRouter } from "next/navigation";

import { AuthContext } from "../../../context/AuthContext";
import ProtectedRoute from "../../../components/ProtectedRoute";

export default function EditProfilePage() {

const router = useRouter();

const { user } =
useContext(AuthContext);

const [username, setUsername] =
useState(user?.username || "");

const [email, setEmail] =
useState(user?.email || "");

const handleSubmit = (e) => {


e.preventDefault();

const updatedUser = {
  ...user,
  username,
  email,
};

localStorage.setItem(
  "user",
  JSON.stringify(updatedUser)
);

alert(
  "Profile Updated Successfully"
);

router.push("/profile");

window.location.reload();


};

return (


<ProtectedRoute>

  <main className="min-h-screen bg-gray-100 p-10">

    <div className="max-w-3xl mx-auto bg-white p-10 rounded-3xl shadow-lg">

      <h1 className="text-4xl font-black mb-8">
        Edit Profile
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >

        <input
          type="text"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
          className="w-full border p-4 rounded-xl"
          placeholder="Username"
        />

        <input
          type="email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="w-full border p-4 rounded-xl"
          placeholder="Email"
        />

        <button
          type="submit"
          className="w-full bg-violet-600 text-white py-4 rounded-xl"
        >
          Save Changes
        </button>

      </form>

    </div>

  </main>

</ProtectedRoute>


);
}
