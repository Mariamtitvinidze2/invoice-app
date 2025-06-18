"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useRouter } from "next/navigation";

type FormData = {
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  password: string;
  repeatPassword: string;
};

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  gender: Yup.string().required("Gender is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Minimum 6 characters")
    .max(20, "Maximum 20 characters")
    .required("Password is required"),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Repeat your password"),
});

const Signup = () => {
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
    console.log("Signup Data:", data);
    router.push("/Home");
  };

  return (
    <div className="flex items-center justify-center w-full h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100">
      <div className="w-[450px] backdrop-blur-md bg-white/70 rounded-xl p-10 shadow-xl border border-gray-200">
        <h5 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Sign Up
        </h5>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <input
            type="text"
            placeholder="First Name"
            {...register("firstName")}
            className="h-11 px-4 mb-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white"
          />
          <p className="text-sm text-red-500 mb-2">
            {errors.firstName?.message}
          </p>

          <input
            type="text"
            placeholder="Last Name"
            {...register("lastName")}
            className="h-11 px-4 mb-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white"
          />
          <p className="text-sm text-red-500 mb-2">
            {errors.lastName?.message}
          </p>

          <select
            {...register("gender")}
            className="h-11 px-4 mb-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-700 bg-white"
          >
            <option value="">Select Gender</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
          </select>
          <p className="text-sm text-red-500 mb-2">{errors.gender?.message}</p>

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
            className="bg-indigo-600 text-white h-11 rounded-lg hover:bg-indigo-700 transition-colors font-medium shadow-md"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/">
            <span className="text-indigo-600 hover:underline cursor-pointer font-medium">
              Sign In
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
