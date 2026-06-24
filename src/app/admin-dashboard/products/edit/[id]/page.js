"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [image, setImage] =
    useState(null);

  const [form, setForm] =
    useState({
      name: "",
      category: "",
      price: "",
      description: "",
    });

  useEffect(() => {
    if (!params?.id) return;

    fetch(
      `http://127.0.0.1:8000/api/products/${params.id}/`
    )
      .then((res) => res.json())
      .then((data) => {
        setForm({
          name: data.name || "",
          category:
            data.category || "",
          price: data.price || "",
          description:
            data.description || "",
        });

        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [params?.id]);

  const handleChange = (e) => {
    const { name, value } =
      e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    try {
      setSaving(true);

      const formData =
        new FormData();

      formData.append(
        "name",
        form.name
      );

      formData.append(
        "category",
        form.category
      );

      formData.append(
        "price",
        form.price
      );

      formData.append(
        "description",
        form.description
      );

      if (image) {
        formData.append(
          "image",
          image
        );
      }

      const response =
        await fetch(
          `http://127.0.0.1:8000/api/products/${params.id}/`,
          {
            method: "PUT",
            body: formData,
          }
        );

      if (!response.ok) {
        alert(
          "Product Update Failed"
        );
        return;
      }

      alert(
        "Product Updated Successfully"
      );

      router.push(
        "/admin-dashboard/products"
      );
    } catch (error) {
      console.error(error);
      alert("Error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-10">

      <div className="max-w-3xl mx-auto bg-white p-8 rounded-3xl shadow-lg">

        <h1 className="text-4xl font-black mb-8">
          Edit Product
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-4 rounded-xl"
            required
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
            className="w-full border p-4 rounded-xl"
            required
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            className="w-full border p-4 rounded-xl"
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="w-full border p-4 rounded-xl h-40"
          />

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
              className="w-40 h-40 object-cover rounded-xl"
            />
          )}

          <button
            type="submit"
            disabled={saving}
            className="w-full bg-blue-600 text-white py-4 rounded-xl"
          >
            {saving
              ? "Updating..."
              : "Update Product"}
          </button>

        </form>

      </div>

    </main>
  );
}