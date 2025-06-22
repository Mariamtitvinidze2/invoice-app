"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";

import { useRouter, usePathname } from "next/navigation";

interface User {
  email: string;
  password: string;
}

type FormData = {
  email: string;
  password: string;
};

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Minimum 6 characters")
    .max(20, "Maximum 20 characters")
    .required("Password is required"),
});
const Signin = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [submitError, setSubmitError] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
  });
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const currentPath = window.location.pathname;

    if (isLoggedIn === "true" && currentPath === "/signin") {
      router.push("/Home");
    }
  }, []);

  useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    if (rememberedEmail) setValue("email", rememberedEmail);
  }, [setValue]);

  const onSubmit = (data: FormData) => {
    const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
    const foundUser = users.find(
      (u) => u.email === data.email && u.password === data.password
    );

    if (foundUser) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("rememberedEmail", data.email);
      router.push("/Home");
    } else {
      setSubmitError("Incorrect email or password");
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100">
      <div className="w-[450px] backdrop-blur-md bg-white/70 rounded-xl p-10 shadow-xl border border-gray-200">
        <h5 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Sign In
        </h5>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <input
            type="text"
            placeholder="Email"
            {...register("email")}
            className="h-11 px-4 mb-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white"
          />
          <p className="text-sm text-red-500 mb-2">{errors.email?.message}</p>

          <input
            type="password"
            placeholder="Password"
            {...register("password")}
            className="h-11 px-4 mb-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white"
          />
          <p className="text-sm text-red-500 mb-2">
            {errors.password?.message}
          </p>

          {submitError && (
            <p className="text-sm text-red-500 mb-2">{submitError}</p>
          )}

          <button
            type="submit"
            className="bg-indigo-600 text-white h-11 w-[370px] rounded-lg hover:bg-indigo-700 transition-colors font-medium shadow-md"
          >
            Sign In
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link href="/sign-up">
            <span className="text-indigo-600 hover:underline cursor-pointer font-medium">
              Sign Up
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;
