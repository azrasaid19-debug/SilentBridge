import { useState } from "react";
import { Link } from "react-router";
import { Form, redirect } from "react-router";
import { verifyUser } from "../models/user";
import { getSession, commitSession } from "../.server/session";
import { useActionData } from "react-router";

export async function action({ request }) {
  let formData = await request.formData();

  let email = formData.get("email");
  let password = formData.get("password");

  console.log("LOGIN HIT:", { email, password });

  let user = await verifyUser(email, password);

  if (!user) {
    return { error: "Invalid email or password" };
  }

  let session = await getSession(request.headers.get("Cookie"));
  session.set("userId", user._id.toString());

  return redirect("/dashboard", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

export default function Login() {
  // FORM STATES
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // SHOW / HIDE PASSWORD
  const [showPassword, setShowPassword] = useState(false);

  // ERROR MESSAGE
  const actionData = useActionData();

  return (
    <main
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
            Welcome Back
          </h1>

          <p className="text-slate-600 dark:text-slate-300 text-sm">
            Log in to continue practicing your saved signs.
          </p>
        </div>

        {/* LOGIN CARD */}
        <div
          className="
          bg-white dark:bg-slate-800
          border border-teal-100 dark:border-teal-900
          rounded-2xl shadow-xl p-10 backdrop-blur-sm
          "
        >
          <Form
            method="post"
            onSubmit={(e) => {
              if (!email.trim() || !password.trim()) {
                e.preventDefault();
                setError("Please fill all fields");
              }
            }}
            className="space-y-6"
          >
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
                autoComplete="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
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
                autoComplete="current-password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              />

              {/* toggle visibility */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
                className="absolute right-3 top-10 text-sm text-slate-500 hover:text-teal-600"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {/* ERROR MESSAGE */}
            {actionData?.error && (
              <p className="text-sm text-red-500 font-medium">
                ⚠ {actionData.error}
              </p>
            )}

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full bg-teal-600 cursor-pointer text-white py-3 rounded-xl font-medium hover:bg-teal-700 transition shadow-md"
            >
              Login
            </button>
          </Form>

          <p className="text-sm mt-4 text-center">
            <Link to="/forgot-password" className="text-teal-600 underline">
              Forgot Password?
            </Link>
          </p>

          {/* REGISTER LINK */}
          <p className="text-center text-sm text-slate-600 dark:text-slate-300 mt-6">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-teal-600 hover:underline font-medium"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
