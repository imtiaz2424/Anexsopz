"use client";

import {
  createContext,
  useState,
  useEffect,
} from "react";

export const AuthContext =
  createContext();

export default function AuthProvider({
  children,
}) {
  const [isLoggedIn, setIsLoggedIn] =
    useState(false);

  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const token =
      localStorage.getItem(
        "access_token"
      );

    const userId =
      localStorage.getItem(
        "user_id"
      );

    if (token) {
      setIsLoggedIn(true);

      if (userId) {
        fetch(
          `http://127.0.0.1:8000/api/profile/${userId}/`
        )
          .then((res) => res.json())
          .then((data) => {
            setUser(data);
          })
          .catch((err) =>
            console.error(err)
          )
          .finally(() => {
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  const login = () => {
    setIsLoggedIn(true);

    const userId =
      localStorage.getItem(
        "user_id"
      );

    if (userId) {
      fetch(
        `http://127.0.0.1:8000/api/profile/${userId}/`
      )
        .then((res) => res.json())
        .then((data) => {
          setUser(data);
        })
        .catch((err) =>
          console.error(err)
        );
    }
  };

  const logout = () => {
    localStorage.removeItem(
      "access_token"
    );

    localStorage.removeItem(
      "refresh_token"
    );

    localStorage.removeItem(
      "user_id"
    );

    localStorage.removeItem(
      "cart"
    );

    localStorage.removeItem(
      "wishlist"
    );

    setUser(null);
    setIsLoggedIn(false);

    window.location.href = "/";
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}