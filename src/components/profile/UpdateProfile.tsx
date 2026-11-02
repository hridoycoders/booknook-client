"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function UpdateProfile() {
  const { data: session, isPending } = authClient.useSession();

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const user = session?.user;

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setImage(user.image || "");
    }
  }, [user]);

  useEffect(() => {
    if (!selectedFile) {
      setPreview("");
      return;
    }

    const previewUrl = URL.createObjectURL(selectedFile);
    setPreview(previewUrl);

    return () => URL.revokeObjectURL(previewUrl);
  }, [selectedFile]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setError("");
    setMessage("");

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image size must be under 5MB.");
      return;
    }

    setSelectedFile(file);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    try {
      let imageUrl = image;

      if (selectedFile) {
        const formData = new FormData();
        formData.append("file", selectedFile);

        const uploadResponse = await fetch("/api/profile/upload", {
          method: "POST",
          body: formData,
        });

        const uploadData = await uploadResponse.json();

        if (!uploadResponse.ok) {
          throw new Error(uploadData.message || "Image upload failed.");
        }

        imageUrl = uploadData.imageUrl;
      }

      const updateData: { name: string; image?: string } = {
        name: name.trim(),
      };

      if (selectedFile) {
        updateData.image = imageUrl;
      }

      const result = await authClient.updateUser(updateData);

      if (result.error) {
        throw new Error(result.error.message || "Profile update failed.");
      }

      setImage(imageUrl);
      setSelectedFile(null);
      setMessage("Profile updated successfully!");
    } catch (err) {
      console.error("Profile update error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  if (isPending) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center theme-bg">
        <p className="theme-muted">Loading profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center theme-bg">
        <p className="theme-text">Please login to update your profile.</p>
      </div>
    );
  }

  const currentImage = preview || image;

  return (
    <main className="flex min-h-[80vh] items-center justify-center bg-[#F5F0E6] px-4 py-10 dark:bg-[#121B18]">
      <div className="w-full max-w-md rounded-2xl border border-[#E8E2D6] bg-white p-6 shadow-lg dark:border-[#34453D] dark:bg-[#1E2B26] sm:p-8">
        {/* Heading */}
        <div className="mb-7 text-center">
          <h1 className="text-2xl font-bold text-[#263D36] dark:text-[#F5F0E6]">
            Update Profile
          </h1>

          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Manage your personal information
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Profile Image */}
          <div className="flex flex-col items-center">
            <div className="relative">
              {currentImage ? (
                <img
                  src={currentImage}
                  alt="Profile"
                  className="h-32 w-32 rounded-full border-4 border-[#E8E2D6] object-cover shadow-md dark:border-[#34453D]"
                />
              ) : (
                <div className="flex h-32 w-32 items-center justify-center rounded-full border-4 border-[#E8E2D6] bg-[#DCD5C9] text-4xl font-bold text-[#263D36] shadow-md dark:border-[#34453D] dark:bg-[#34453D] dark:text-[#F5F0E6]">
                  {name?.charAt(0)?.toUpperCase() || "U"}
                </div>
              )}

              <label
                htmlFor="profile-image"
                className="absolute bottom-1 right-1 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-2 border-white bg-[#263D36] text-white shadow-md transition hover:bg-[#3B594D] dark:border-[#1E2B26] dark:bg-[#D18B55] dark:text-[#121B18] dark:hover:bg-[#E5A66F]"
                title="Change profile picture"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L8 18l-4 1 1-4Z" />
                </svg>
              </label>

              <input
                id="profile-image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>

            <p className="mt-3 text-sm font-medium text-[#BD7641] dark:text-[#E5A66F]">
              Change Profile Picture
            </p>
          </div>

          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-semibold text-[#263D36] dark:text-[#F5F0E6]"
            >
              Full Name
            </label>

            <input
              id="name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              minLength={2}
              className="w-full rounded-lg border border-[#E8E2D6] bg-[#FAF8F3] px-4 py-3 text-sm text-[#263D36] outline-none transition focus:border-[#BD7641] focus:ring-2 focus:ring-[#BD7641]/20 dark:border-[#34453D] dark:bg-[#121B18] dark:text-[#F5F0E6]"
              placeholder="Enter your name"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-semibold text-[#263D36] dark:text-[#F5F0E6]"
            >
              Email Address
            </label>

            <input
              id="email"
              type="email"
              value={user.email || ""}
              readOnly
              className="w-full cursor-not-allowed rounded-lg border border-[#E8E2D6] bg-gray-100 px-4 py-3 text-sm text-gray-500 outline-none dark:border-[#34453D] dark:bg-[#26352E] dark:text-gray-400"
            />
          </div>

          {/* Messages */}
          {error && (
            <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600 dark:bg-red-950/30 dark:text-red-400">
              {error}
            </p>
          )}

          {message && (
            <p className="rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700 dark:bg-green-950/30 dark:text-green-400">
              {message}
            </p>
          )}

          {/* Save Button */}
          <button
            type="submit"
            disabled={loading || !name.trim()}
            className="w-full rounded-lg bg-[#263D36] px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-[#3B594D] disabled:cursor-not-allowed disabled:opacity-60 dark:bg-[#D18B55] dark:text-[#121B18] dark:hover:bg-[#E5A66F]"
          >
            {loading ? "Saving Changes..." : "Save Changes"}
          </button>
        </form>
      </div>
    </main>
  );
}
