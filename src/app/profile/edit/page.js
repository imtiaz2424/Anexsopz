"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function EditProfilePage() {

  const router = useRouter();

  const [profile, setProfile] =
    useState(null);

  const [image, setImage] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

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

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      if (!profile) return;

      try {

        setLoading(true);

        const formData =
          new FormData();

        if (image) {
          formData.append(
            "image",
            image
          );
        }

        const response =
          await fetch(
            `http://127.0.0.1:8000/api/profiles/${profile.id}/`,
            {
              method: "PATCH",
              body: formData,
            }
          );

        if (!response.ok) {

          alert(
            "Upload Failed"
          );

          return;
        }

        alert(
          "Profile Updated Successfully"
        );

        router.push(
          "/profile"
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

  if (!profile) {

    return (
      <div className="p-10">
        Loading...
      </div>
    );

  }

  return (
    <main className="min-h-screen bg-gray-100 p-10">

      <div className="max-w-3xl mx-auto bg-white p-8 rounded-3xl shadow-lg">

        <h1 className="text-4xl font-black mb-8">
          Edit Profile
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {profile.image && (

            <img
              src={profile.image}
              alt="Profile"
              className="w-40 h-40 rounded-full object-cover"
            />

          )}

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setImage(
                e.target.files[0]
              )
            }
            className="w-full border p-4 rounded-xl"
          />

          {image && (

            <img
              src={URL.createObjectURL(
                image
              )}
              alt="Preview"
              className="w-40 h-40 rounded-full object-cover"
            />

          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-4 rounded-xl"
          >
            {loading
              ? "Uploading..."
              : "Save Changes"}
          </button>

        </form>

      </div>

    </main>
  );
}