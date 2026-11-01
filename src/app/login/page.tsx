"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { error: loginError } = await authClient.signIn.email({
        email,
        password,
      });

      if (loginError) {
        setError(loginError.message || "Invalid email or password.");
        return;
      }

      router.push("/");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-[80vh] items-center justify-center bg-[#F5F0E6] px-3 py-10 transition-colors dark:bg-[#121B18] sm:px-6">
      <section className="w-full max-w-md rounded-2xl border border-[#E8E2D6] bg-white p-5 shadow-sm transition-colors dark:border-[#34453D] dark:bg-[#1E2B26] sm:p-8">
        <div className="mb-7 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[3px] text-[#BD7641] dark:text-[#E5A66F]">
            Welcome Back
          </p>

          <h1 className="mt-2 text-2xl font-bold text-[#263D36] dark:text-[#F5F0E6] sm:text-3xl">
            Login to BookNook
          </h1>

          <p className="mt-2 text-xs text-[#66736B] dark:text-[#AAB7AE]">
            Continue your reading journey with us.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-[#263D36] dark:text-[#F5F0E6]">
              Email Address
            </label>

            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full rounded-lg border border-[#E8E2D6] bg-white px-3 py-3 text-xs text-[#263D36] outline-none transition placeholder:text-[#999] focus:border-[#D18B55] dark:border-[#34453D] dark:bg-[#121B18] dark:text-[#F5F0E6] dark:placeholder:text-[#849188] sm:text-sm"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold text-[#263D36] dark:text-[#F5F0E6]">
              Password
            </label>

            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full rounded-lg border border-[#E8E2D6] bg-white px-3 py-3 text-xs text-[#263D36] outline-none transition placeholder:text-[#999] focus:border-[#D18B55] dark:border-[#34453D] dark:bg-[#121B18] dark:text-[#F5F0E6] dark:placeholder:text-[#849188] sm:text-sm"
            />
          </div>

          {error && (
            <p className="rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-600 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[#263D36] py-3 text-sm font-bold text-white transition hover:bg-[#3B594D] disabled:cursor-not-allowed disabled:opacity-60 dark:bg-[#D18B55] dark:text-[#121B18] dark:hover:bg-[#E5A66F]"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-[#66736B] dark:text-[#AAB7AE]">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="font-bold text-[#BD7641] hover:underline dark:text-[#E5A66F]"
          >
            Create Account
          </Link>
        </p>
      </section>
    </main>
  );
}
