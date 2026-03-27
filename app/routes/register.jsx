import { useState } from "react";
import { Link } from "react-router";
import { Form, redirect } from "react-router";
import { createUser } from "../models/user";
import { getSession, commitSession } from "../.server/session";
import { useActionData } from "react-router";

export async function action({ request }) {
  let formData = await request.formData();

  let name = formData.get("name");
  let email = formData.get("email");
  let password = formData.get("password");

  console.log("REGISTER HIT:", { name, email, password });

  try {
    let result = await createUser({ name, email, password });

    console.log("USER CREATED:", result);

    let session = await getSession(request.headers.get("Cookie"));
    session.set("userId", result.insertedId.toString());

    return redirect("/dashboard", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  } catch (error) {
    console.log("REGISTER ERROR:", error.message);
    return { error: error.message };
  }
}

export default function Register() {
  // FORM STATES
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  // ERROR MESSAGE STATE
  const actionData = useActionData();

  return (
    <div
      className="
      min-h-[85vh]
      flex items-center justify-center
      px-6 py-16
      bg-linear-to-b
      from-teal-100 via-white to-teal-50
      dark:from-teal-950 dark:via-slate-900 dark:to-slate-900
      "
    >
      {/* PAGE CONTAINER */}

      <div className="w-full max-w-md">
        {/* HEADER */}

        <div className="text-center mb-14">
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-4">
            Create Your Account
          </h1>

          <p className="text-slate-600 dark:text-slate-300 text-sm">
            Start saving and practicing the signs you learn.
          </p>
        </div>

        {/* FORM CARD */}

        <div
          className="
          bg-white dark:bg-slate-800
          border border-teal-100 dark:border-teal-900
          rounded-2xl
          shadow-xl
          p-10
          backdrop-blur-sm
          "
        >
          <Form
            method="post"
            onSubmit={(e) => {
              if (password !== confirmPassword) {
                e.preventDefault(); // 🚫 stop form submission
                setError("Passwords do not match");
              }
            }}
            className="space-y-6"
          >
            {/* NAME */}

            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300"
              >
                Name
              </label>

              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="
                w-full px-4 py-3 rounded-lg
                border border-slate-300 dark:border-slate-700
                bg-white dark:bg-slate-900
                text-slate-800 dark:text-white
                focus:outline-none focus:ring-2 focus:ring-teal-500
                "
              />
            </div>

            {/* EMAIL */}

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300"
              >
                Email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="
                w-full px-4 py-3 rounded-lg
                border border-slate-300 dark:border-slate-700
                bg-white dark:bg-slate-900
                text-slate-800 dark:text-white
                focus:outline-none focus:ring-2 focus:ring-teal-500
                "
              />
            </div>

            {/* PASSWORD */}

            <div className="relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300"
              >
                Password
              </label>

              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                className="
                w-full px-4 py-3 rounded-lg
                border border-slate-300 dark:border-slate-700
                bg-white dark:bg-slate-900
                text-slate-800 dark:text-white
                focus:outline-none focus:ring-2 focus:ring-teal-500
                "
              />

              {/* toggle password visibility */}

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3 top-10 text-sm text-slate-500 hover:text-teal-600"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {/* CONFIRM PASSWORD */}

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300"
              >
                Confirm Password
              </label>

              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setError("");
                }}
                className="
                w-full px-4 py-3 rounded-lg
                border border-slate-300 dark:border-slate-700
                bg-white dark:bg-slate-900
                text-slate-800 dark:text-white
                focus:outline-none focus:ring-2 focus:ring-teal-500
                "
              />
            </div>

            {/* ERROR MESSAGE */}

            {actionData?.error && (
              <p className="text-sm text-red-500 font-medium">
                ⚠ {actionData.error}
              </p>
            )}

            {/* SUBMIT */}

            <button
              type="submit"
              className="
              w-full
              bg-teal-600
              text-white
              py-3
              rounded-xl
              font-medium
              hover:bg-teal-700
              transition
              shadow-md
              "
            >
              Create Account
            </button>
          </Form>

          {/* LOGIN LINK */}

          <p className="text-center text-sm text-slate-600 dark:text-slate-300 mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-teal-600 hover:underline font-medium"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
