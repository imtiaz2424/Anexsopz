"use client";

import {
  createContext,
  useState,
  useEffect,
} from "react";

export const CartContext =
  createContext();

export default function CartProvider({
  children,
}) {
  const [cart, setCart] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    try {
      const savedCart =
        localStorage.getItem("cart");

      if (savedCart) {
        setCart(
          JSON.parse(savedCart)
        );
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!loading) {
      localStorage.setItem(
        "cart",
        JSON.stringify(cart)
      );
    }
  }, [cart, loading]);

  const addToCart = (
    product
  ) => {
    const exists =
      cart.find(
        (item) =>
          item.id === product.id
      );

    if (exists) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity:
                  (item.quantity ||
                    1) + 1,
              }
            : item
        )
      );
    } else {
      setCart([
        ...cart,
        {
          ...product,
          quantity: 1,
        },
      ]);
    }
  };

  const removeFromCart = (
    productId
  ) => {
    setCart(
      cart.filter(
        (item) =>
          item.id !== productId
      )
    );
  };

const increaseQuantity = (
  productId
) => {

  setCart(
    cart.map((item) => {

      if (
        item.id === productId
      ) {

        return {
          ...item,
          quantity:
            item.quantity + 1,
        };

      }

      return item;

    })
  );

};


  const decreaseQuantity = (
    productId
  ) => {
    setCart(
      cart
        .map((item) => {
          if (
            item.id === productId
          ) {
            return {
              ...item,
              quantity:
                item.quantity - 1,
            };
          }
          return item;
        })
        .filter(
          (item) =>
            item.quantity > 0
        )
    );
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem(
      "cart"
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}