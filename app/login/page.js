"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

// Validation Schema
const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [error, setError] = useState("");

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json();
        setError(errorData.message);
        return;
      }

      const userData = await res.json();
      login(userData);
      router.push("/dashboard");
    } catch (err) {
      setError("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-violet-50 p-4">
      <div className="w-full max-w-md animate-[fadeIn_0.4s_ease-out]">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
              Welcome Back
            </h2>
            <p className="text-gray-600 mt-2">
              Sign in to your account
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-1">
              <div className="relative group">
                <input
                  {...register("email")}
                  type="email"
                  placeholder="Email address"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none text-gray-800 placeholder-gray-400"
                />
                {errors.email && (
                  <p className="text-sm text-amber-600 mt-1 ml-1 animate-[fadeIn_0.2s_ease-out]">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-1">
              <div className="relative group">
                <input
                  {...register("password")}
                  type="password"
                  placeholder="Password"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none text-gray-800 placeholder-gray-400"
                />
                {errors.password && (
                  <p className="text-sm text-amber-600 mt-1 ml-1 animate-[fadeIn_0.2s_ease-out]">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            {error && (
              <div className="bg-amber-50 text-amber-800 px-4 py-3 rounded-xl animate-[fadeIn_0.2s_ease-out]">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-violet-600 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 transform hover:translate-y-[-1px] hover:shadow-lg active:translate-y-[1px] active:shadow-none"
            >
              Sign In
            </button>

            <div className="mt-6 text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <a href="/register" className="text-blue-600 hover:text-blue-700 font-medium">
                Sign up
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}