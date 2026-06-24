"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {

const [products, setProducts] =
useState([]);

const [loading, setLoading] =
useState(true);

const [search, setSearch] =
useState("");

const [category, setCategory] =
useState("All");

const [sortBy, setSortBy] =
useState("default");

useEffect(() => {


fetch(
  "http://127.0.0.1:8000/api/products/"
)
  .then((res) => res.json())
  .then((data) => {

    setProducts(data);
    setLoading(false);

  })
  .catch((err) => {

    console.error(err);
    setLoading(false);

  });


}, []);

const categories = [
"All",
...new Set(
products.map(
(product) =>
product.category
)
),
];

let filteredProducts =
products.filter((product) => {


  const matchSearch =
    product.name
      .toLowerCase()
      .includes(
        search.toLowerCase()
      );

  const matchCategory =
    category === "All" ||
    product.category ===
      category;

  return (
    matchSearch &&
    matchCategory
  );

});


if (sortBy === "low") {


filteredProducts.sort(
  (a, b) =>
    Number(a.price) -
    Number(b.price)
);


}

if (sortBy === "high") {


filteredProducts.sort(
  (a, b) =>
    Number(b.price) -
    Number(a.price)
);


}

return ( <main className="min-h-screen bg-gray-100">


  <section className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white py-20">

    <div className="max-w-7xl mx-auto px-8 text-center">

      <h1 className="text-6xl font-black mb-4">
        Anexsopz Store
      </h1>

      <p className="text-xl">
        Premium Ecommerce Website
      </p>

    </div>

  </section>

  <section className="max-w-7xl mx-auto px-8 py-10">

    <div className="grid md:grid-cols-3 gap-4 mb-8">

      <input
        type="text"
        placeholder="Search Product..."
        value={search}
        onChange={(e) =>
          setSearch(
            e.target.value
          )
        }
        className="border p-4 rounded-xl"
      />

      <select
        value={category}
        onChange={(e) =>
          setCategory(
            e.target.value
          )
        }
        className="border p-4 rounded-xl"
      >

        {categories.map(
          (cat) => (
            <option
              key={cat}
              value={cat}
            >
              {cat}
            </option>
          )
        )}

      </select>

      <select
        value={sortBy}
        onChange={(e) =>
          setSortBy(
            e.target.value
          )
        }
        className="border p-4 rounded-xl"
      >

        <option value="default">
          Sort Products
        </option>

        <option value="low">
          Price Low → High
        </option>

        <option value="high">
          Price High → Low
        </option>

      </select>

    </div>

    {loading ? (

      <div className="bg-white p-8 rounded-3xl shadow">
        Loading Products...
      </div>

    ) : filteredProducts.length === 0 ? (

      <div className="bg-white p-8 rounded-3xl shadow">
        No Products Found
      </div>

    ) : (

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

        {filteredProducts.map(
          (product) => (

            <Link
              key={product.id}
              href={`/products/${product.id}`}
            >

              <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition">

                <img
                  src={
                    product.image
                  }
                  alt={
                    product.name
                  }
                  className="w-full h-72 object-cover"
                />

                <div className="p-6">

                  <p className="text-sm text-violet-600 font-bold">
                    {
                      product.category
                    }
                  </p>

                  <h2 className="text-2xl font-bold mt-2">
                    {
                      product.name
                    }
                  </h2>

                  <p className="text-gray-500 mt-3">
                    {
                      product.description
                    }
                  </p>

                  <p className="text-3xl font-black mt-4">
                    $
                    {
                      product.price
                    }
                  </p>

                </div>

              </div>

            </Link>

          )
        )}

      </div>

    )}

  </section>

</main>


);
}
