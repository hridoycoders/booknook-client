"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (!/[A-Z]/.test(password) || !/[a-z]/.test(password)) {
      setError("Password must contain uppercase and lowercase letters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const { error: signupError } = await authClient.signUp.email({
        name,
        email,
        password,
      });

      if (signupError) {
        setError(signupError.message || "Signup failed.");
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

  const inputClass =
    "w-full rounded-lg border border-[#E8E2D6] bg-white px-3 py-3 text-xs text-[#263D36] outline-none transition placeholder:text-[#999] focus:border-[#D18B55] dark:border-[#34453D] dark:bg-[#121B18] dark:text-[#F5F0E6] dark:placeholder:text-[#849188] sm:text-sm";

  const labelClass =
    "mb-1.5 block text-xs font-semibold text-[#263D36] dark:text-[#F5F0E6]";

  return (
    <main className="flex min-h-[80vh] items-center justify-center bg-[#F5F0E6] px-3 py-10 transition-colors dark:bg-[#121B18] sm:px-6">
      <section className="w-full max-w-md rounded-2xl border border-[#E8E2D6] bg-white p-5 shadow-sm transition-colors dark:border-[#34453D] dark:bg-[#1E2B26] sm:p-8">
        <div className="mb-7 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[3px] text-[#BD7641] dark:text-[#E5A66F]">
            Join Our Community
          </p>

          <h1 className="mt-2 text-2xl font-bold text-[#263D36] dark:text-[#F5F0E6] sm:text-3xl">
            Create Account
          </h1>

          <p className="mt-2 text-xs text-[#66736B] dark:text-[#AAB7AE]">
            Create your BookNook account and explore books.
          </p>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className={labelClass}>Full Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Confirm Password</label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              className={inputClass}
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
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-[#66736B] dark:text-[#AAB7AE]">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-bold text-[#BD7641] hover:underline dark:text-[#E5A66F]"
          >
            Login
          </Link>
        </p>
      </section>
    </main>
  );
}
