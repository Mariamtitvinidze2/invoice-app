"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useRouter } from "next/navigation";

type FormData = {
  email: string;
  password: string;
  repeatPassword: string;
};

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Minimum 6 characters")
    .max(20, "Maximum 20 characters")
    .required("Password is required"),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Repeat your password"),
});

const Signin = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
  });

  const [submitError, setSubmitError] = useState("");

  const onSubmit = (data: FormData) => {
    console.log("Form Data:", data);
    router.push("/Home");
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

          <input
            type="password"
            placeholder="Repeat Password"
            {...register("repeatPassword")}
            className="h-11 px-4 mb-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white"
          />
          <p className="text-sm text-red-500 mb-4">
            {errors.repeatPassword?.message}
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
