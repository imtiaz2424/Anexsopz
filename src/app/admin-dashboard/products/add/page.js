"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddProductPage() {

  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
  });

  const [image, setImage] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

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

      setLoading(true);

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
          "http://127.0.0.1:8000/api/products/",
          {
            method: "POST",
            body: formData,
          }
        );

      if (!response.ok) {

        const error =
          await response.json();

        console.log(error);

        alert(
          "Product Add Failed"
        );

        return;
      }

      alert(
        "Product Added Successfully"
      );

      router.push(
        "/admin-dashboard/products"
      );

    } catch (error) {

      console.error(error);

      alert("Error");

    } finally {

      setLoading(false);

    }

  };

  return (
    <main className="min-h-screen bg-gray-100 p-10">

      <div className="max-w-3xl mx-auto bg-white p-8 rounded-3xl shadow-lg">

        <h1 className="text-4xl font-black mb-8">
          Add Product
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

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border p-4 rounded-xl"
          >
            <option value="">
              Select Category
            </option>

            <option value="Electronics">
              Electronics
            </option>

            <option value="Fashion">
              Fashion
            </option>

            <option value="Shoes">
              Shoes
            </option>

            <option value="Watch">
              Watch
            </option>

            <option value="Laptop">
              Laptop
            </option>

            <option value="Phone">
              Phone
            </option>

            <option value="Accessories">
              Accessories
            </option>
          </select>

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            className="w-full border p-4 rounded-xl"
            required
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
            required
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

          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="w-full border p-4 rounded-xl h-40"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-4 rounded-xl"
          >
            {loading
              ? "Adding..."
              : "Add Product"}
          </button>

        </form>

      </div>

    </main>
  );
}