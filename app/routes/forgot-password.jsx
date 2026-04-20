import { Form, useActionData } from "react-router";
import crypto from "crypto";
import { getUserByEmail, setResetToken } from "../models/user";
import { useState } from "react";

export default function ForgotPassword() {
  const actionData = useActionData();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="bg-linear-to-b from-teal-100 via-white to-teal-50 dark:from-teal-950 dark:via-slate-900 dark:to-slate-900 p-8 rounded-2xl shadow-xl w-full max-w-md border border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold mb-6 text-slate-800 dark:text-white text-center">
          Forgot Password
        </h2>

        <Form
          method="post"
          onSubmit={(e) => {
            if (!email.trim()) {
              e.preventDefault();
              setError("Please enter your email");
            }
          }}
          className="space-y-4"
        >
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError(""); // clears error while typing
            }}
            className="
    w-full px-4 py-3 rounded-lg
    border border-slate-300 dark:border-slate-700
    bg-white dark:bg-slate-900
    text-slate-800 dark:text-white
    focus:outline-none focus:ring-2 focus:ring-teal-500
  "
          />
          {error && (
            <p className="text-sm text-red-500 animate-pulse">⚠ {error}</p>
          )}
          <button
            className="
          w-full bg-teal-600 text-white py-3 rounded-xl
          hover:bg-teal-700 transition font-medium
        "
          >
            Send Reset Link
          </button>
        </Form>

        {actionData?.message && (
          <div className="mt-6 text-sm text-center">
            <p className="text-slate-600 dark:text-slate-300">
              {actionData.message}
            </p>

            {actionData.resetLink && (
              <a
                href={actionData.resetLink}
                className="underline block mt-3 text-teal-600 hover:text-teal-700"
              >
                Reset Password
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const email = formData.get("email");

  const user = await getUserByEmail(email);

  // Always return same message (security)
  if (!user) {
    return {
      message: "If this email exists, you can reset your password below.",
      resetLink: null,
    };
  }

  // Generate token
  const token = crypto.randomBytes(32).toString("hex");

  // 1 hour expiry
  const expiry = Date.now() + 1000 * 60 * 60;

  // Save to DB
  await setResetToken(user._id.toString(), token, expiry);

  // Create link
  const resetLink = `/reset-password/${token}`;

  return {
    message: "Click the link below to reset your password:",
    resetLink,
  };
}
