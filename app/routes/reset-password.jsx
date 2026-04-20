import { Form, useActionData, useParams } from "react-router";
import { useState } from "react";

import { getUserByResetToken, updatePassword } from "../models/user";

export async function action({ request }) {
  const formData = await request.formData();

  const token = formData.get("token");
  const newPassword = formData.get("password");

  if (!token || !newPassword) {
    return { message: "Invalid request" };
  }

  const user = await getUserByResetToken(token);

  if (!user) {
    return { message: "Reset link is invalid or expired" };
  }

  await updatePassword(user._id.toString(), newPassword);

  return {
    message: "Password reset successful! You can now log in.",
  };
}

export default function ResetPassword() {
  const { token } = useParams();
  const actionData = useActionData();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="bg-linear-to-b from-teal-100 via-white to-teal-50 dark:from-teal-950 dark:via-slate-900 dark:to-slate-900 p-8 rounded-2xl shadow-xl w-full max-w-md border border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold mb-6 text-center text-slate-800 dark:text-white">
          Reset Password
        </h2>

        <Form
          method="post"
          onSubmit={(e) => {
            if (password !== confirmPassword) {
              e.preventDefault();
              setError("Passwords do not match");
            }
          }}
          className="space-y-4"
        >
          <input type="hidden" name="token" value={token} />

          {/* PASSWORD */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-white"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-sm text-slate-500"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {/* CONFIRM PASSWORD */}
          <input
            type={showPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setError("");
            }}
            className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-white"
          />

          {error && (
            <p className="text-sm text-red-500 mt-2 animate-pulse">⚠ {error}</p>
          )}

          <button className="w-full bg-teal-600 text-white py-3 rounded-xl hover:bg-teal-700 transition">
            Reset Password
          </button>
        </Form>

        {actionData?.message && (
          <p className="mt-4 text-center text-sm text-teal-600">
            {actionData.message}
          </p>
        )}
      </div>
    </div>
  );
}
