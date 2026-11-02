"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

// Google Icon — declared outside SignupPage
function GoogleIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      className="h-4 w-4 sm:h-5 sm:w-5"
      aria-hidden="true"
    >
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z"
      />
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.76 7.18l7.73 6C44.42 37.96 46.98 31.7 46.98 24.55Z"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.59a14.4 14.4 0 0 1 0-9.18l-7.98-6.19a24 24 0 0 0 0 21.56l7.98-6.19Z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.91-5.8l-7.73-6c-2.15 1.45-4.9 2.3-8.18 2.3-6.26 0-11.57-4.22-13.46-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z"
      />
    </svg>
  );
}

// Eye Icon — declared outside SignupPage
function EyeIcon({ visible }: { visible: boolean }) {
  return visible ? (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4 sm:h-5 sm:w-5"
      aria-hidden="true"
    >
      <path d="M3 3l18 18M10.6 10.6a2 2 0 002.8 2.8" />
      <path d="M9.9 5.2A10.8 10.8 0 0112 5c5 0 9 7 9 7a15 15 0 01-3.1 3.8M6.2 6.2C4.2 7.5 3 12 3 12s4 7 9 7c1.3 0 2.5-.4 3.5-1" />
    </svg>
  ) : (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4 sm:h-5 sm:w-5"
      aria-hidden="true"
    >
      <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
    "w-full rounded-lg border border-[#E8E2D6] bg-white px-3 py-2.5 text-xs text-[#263D36] outline-none transition placeholder:text-[#999] focus:border-[#D18B55] dark:border-[#34453D] dark:bg-[#121B18] dark:text-[#F5F0E6] dark:placeholder:text-[#849188] sm:text-sm";

  const labelClass =
    "mb-1 block text-[11px] font-semibold text-[#263D36] dark:text-[#F5F0E6] sm:text-xs";

  const eyeButtonClass =
    "absolute inset-y-0 right-3 flex items-center text-[#849188] transition hover:text-[#BD7641] dark:hover:text-[#E5A66F]";

  return (
    <main className="flex min-h-[75vh] items-center justify-center bg-[#F5F0E6] px-3 py-6 transition-colors dark:bg-[#121B18] sm:px-5 sm:py-8">
      <section className="w-full max-w-sm rounded-2xl border border-[#E8E2D6] bg-white p-4 shadow-sm transition-colors dark:border-[#34453D] dark:bg-[#1E2B26] sm:p-6">
        {/* Header */}
        <div className="mb-5 text-center">
          <p className="text-[9px] font-bold uppercase tracking-[2.5px] text-[#BD7641] dark:text-[#E5A66F]">
            Join Our Community
          </p>

          <h1 className="mt-1.5 text-xl font-bold text-[#263D36] dark:text-[#F5F0E6] sm:text-2xl">
            Create Account
          </h1>

          <p className="mt-1.5 text-[11px] text-[#66736B] dark:text-[#AAB7AE] sm:text-xs">
            Create your BookNook account and explore books.
          </p>
        </div>

        <form onSubmit={handleSignup} className="space-y-3">
          {/* Full Name */}
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

          {/* Email */}
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

          {/* Password */}
          <div>
            <label className={labelClass}>Password</label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                className={`${inputClass} pr-10`}
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                aria-pressed={showPassword}
                className={eyeButtonClass}
              >
                <EyeIcon visible={showPassword} />
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className={labelClass}>Confirm Password</label>

            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                className={`${inputClass} pr-10`}
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                aria-label={
                  showConfirmPassword
                    ? "Hide confirm password"
                    : "Show confirm password"
                }
                aria-pressed={showConfirmPassword}
                className={eyeButtonClass}
              >
                <EyeIcon visible={showConfirmPassword} />
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <p
              role="alert"
              className="rounded-lg border border-red-200 bg-red-50 p-2.5 text-[11px] text-red-600 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300"
            >
              {error}
            </p>
          )}

          {/* Register Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[#263D36] py-2.5 text-xs font-bold text-white transition hover:bg-[#3B594D] disabled:cursor-not-allowed disabled:opacity-60 dark:bg-[#D18B55] dark:text-[#121B18] dark:hover:bg-[#E5A66F] sm:text-sm"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

          {/* OR Divider */}
          <div className="relative py-1">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#E8E2D6] dark:border-[#34453D]" />
            </div>

            <div className="relative flex justify-center">
              <span className="bg-white px-3 text-[10px] font-medium text-[#849188] dark:bg-[#1E2B26]">
                OR
              </span>
            </div>
          </div>

          {/* Google Signup */}
          <button
            type="button"
            onClick={() =>
              authClient.signIn.social({
                provider: "google",
                callbackURL: "/",
              })
            }
            className="flex w-full items-center justify-center gap-2.5 rounded-lg border border-[#E8E2D6] bg-white py-2.5 text-xs font-semibold text-[#263D36] transition hover:bg-[#F5F0E6] dark:border-[#34453D] dark:bg-[#121B18] dark:text-[#F5F0E6] dark:hover:bg-[#263D36] sm:text-sm"
          >
            <GoogleIcon />
            Continue with Google
          </button>
        </form>

        {/* Login Link */}
        <p className="mt-4 text-center text-[11px] text-[#66736B] dark:text-[#AAB7AE] sm:text-xs">
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
