"use client";

import { useState, useEffect, useContext } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

import { CartContext } from "../../../context/CartContext";
import { WishlistContext } from "../../../context/WishlistContext";

export default function ProductDetails() {
const params = useParams();

const { addToCart } = useContext(CartContext);
const { wishlist, toggleWishlist } =
useContext(WishlistContext);

const [product, setProduct] = useState(null);
const [products, setProducts] = useState([]);
const [ratings, setRatings] = useState({});
const [reviews, setReviews] = useState([]);
const [comment, setComment] = useState("");
const [reviewRating, setReviewRating] = useState(5);


useEffect(() => {
  if (!params?.id) return;

  fetch(`http://127.0.0.1:8000/api/products/${params.id}/`)
    .then((res) => res.json())
    .then((data) => { setProduct(data);});

  fetch("http://127.0.0.1:8000/api/products/")
    .then((res) => res.json())
    .then((data) => {setProducts(data);});

  fetch(`http://127.0.0.1:8000/api/reviews/?product=${params.id}`)
  .then((res) => res.json())
  .then((data) => {setReviews(data);});

  
  const savedRatings = localStorage.getItem("ratings");

  if (savedRatings) {setRatings(JSON.parse(savedRatings));}
}, [params?.id]);

if (!product) {
return ( <div className="min-h-screen flex items-center justify-center text-3xl font-bold">
Loading... </div>
);
}

const currentRating = ratings[product.id] || 0;
const handleRate = (value) => {
const updated = {...ratings, [product.id]: value,};
    setRatings(updated);

    localStorage.setItem(
      "ratings",
      JSON.stringify(updated)
    );
};

const isWishlisted = wishlist?.some((item) =>
  item.id === product.id
  );

const relatedProducts = products.filter(
  (item) =>
  item.category ===
  product.category &&
  item.id !== product.id
  );


const submitReview = async () => {

  const userId =
    localStorage.getItem("user_id");

  if (!userId) {
    alert("Please Login");
    return;
  }

  if (!comment.trim()) {
    alert("Write a review");
    return;
  }

  try {

    const response =
      await fetch(
        "http://127.0.0.1:8000/api/reviews/",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            user: Number(userId),
            product: Number(product.id),
            rating: Number(reviewRating),
            comment: comment,
          }),
        }
      );

    const data =
      await response.json();

    if (!response.ok) {
      console.log(data);
      alert("Review Failed");
      return;
    }

    setReviews((prev) => [
      data,
      ...prev,
    ]);

    setComment("");
    setReviewRating(5);

    alert(
      "Review Added Successfully"
    );

  } catch (error) {

    console.error(error);

    alert("Error");

  }

};




return ( <main className="min-h-screen bg-gray-100 py-10 px-5">


  <div className="max-w-7xl mx-auto">

    <Link
      href="/"
      className="inline-block mb-8 bg-black text-white px-5 py-3 rounded-xl"
    >
      ← Back
    </Link>

    <div className="bg-white rounded-3xl shadow-lg overflow-hidden grid lg:grid-cols-2">

      <div>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>



      <div className="p-10">

        <p className="text-gray-500 uppercase">
          {product.category}
        </p>


        <h1 className="text-5xl font-black mt-3">
          {product.name}
        </h1>


        <div className="mt-5">

          {[1, 2, 3, 4, 5].map(
            (star) => (
              <button
                key={star}
                onClick={() =>
                  handleRate(star)
                }
                className={
                  star <=
                  currentRating
                    ? "text-yellow-400 text-3xl"
                    : "text-gray-300 text-3xl"
                }
              >
                ★
              </button>
            )
          )}

          <p className="mt-2">
            Rating:
            {" "}
            {currentRating}/5
          </p>

        </div>



        <p className="mt-6 text-gray-600">
          {product.description}
        </p>






        <div className="mt-8">

          <h2 className="text-5xl font-black">
            ${product.price}
          </h2>

        </div>
 


{/* Wishlist section */}

        <div className="mt-8 flex flex-col gap-4">

          <button
            onClick={() => {
              addToCart(product);
              alert(
                "Added To Cart"
              );
            }}
            className="bg-black text-white py-4 rounded-xl"
          >
            Add To Cart
          </button>

          <button
            onClick={() =>
              toggleWishlist(
                product
              )
            }
            className="border border-pink-500 text-pink-500 py-4 rounded-xl"
          >
            {isWishlisted
              ? "❤️ Remove Wishlist"
              : "🤍 Add Wishlist"}
          </button>

          <Link
            href="/cart"
            className="bg-gray-200 py-4 rounded-xl text-center"
          >
            View Cart
          </Link>

        </div>
      </div>

    </div>


{/* Reviews section */}

    <div className="mt-10">

          <h2 className="text-2xl font-bold mb-4">
            Write Review
          </h2>

          <select
            value={reviewRating}
            onChange={(e) =>
              setReviewRating(
                Number(
                  e.target.value
                )
              )
            }
            className="border p-3 rounded-xl w-full mb-3"
          >
            <option value="5">
              5 Stars
            </option>

            <option value="4">
              4 Stars
            </option>

            <option value="3">
              3 Stars
            </option>

            <option value="2">
              2 Stars
            </option>

            <option value="1">
              1 Star
            </option>
          </select>

          <textarea
            value={comment}
            onChange={(e) =>
              setComment(
                e.target.value
              )
            }
            placeholder="Write review..."
            className="w-full border p-4 rounded-xl"
          />

          <button
            onClick={submitReview}
            className="mt-4 bg-violet-600 text-white px-6 py-3 rounded-xl"
          >
            Submit Review
          </button>

        </div>





        <div className="mt-16">

            <h2 className="text-3xl font-black mb-6">
              Reviews ({reviews.length})
            </h2>

            {reviews.length === 0 ? (

              <p>No Reviews Yet</p>

            ) : (

              reviews.map((review) => (

                <div
                  key={review.id}
                  className="bg-white p-5 rounded-2xl mb-4 shadow"
                >

                  <div className="flex justify-between items-center">

                    <p className="font-bold text-violet-600">
                      👤 {review.username || `User ${review.user}`}
                    </p>

                    <p className="font-bold text-yellow-500">
                      ⭐ {review.rating}/5
                    </p>

                  </div>

                  <p className="mt-3 text-gray-700">
                    {review.comment}
                  </p>

                </div>

              ))

            )}

          </div>








    <div className="mt-16">

      <h2 className="text-3xl font-black mb-8">
        Related Products
      </h2>

      <div className="grid md:grid-cols-3 gap-6">

        {relatedProducts.map(
          (item) => (
            <Link
              key={item.id}
              href={`/products/${item.id}`}
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:-translate-y-1 transition">

                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-56 object-cover"
                />

                <div className="p-4">

                  <h3 className="font-bold">
                    {item.name}
                  </h3>

                  <p className="text-xl font-black mt-2">
                    ${item.price}
                  </p>

                </div>

              </div>
            </Link>
          )
        )}

      </div>

    </div>





  </div>

</main>


);
}
