import { useState } from "react";
import { Link } from "react-router";

export default function Login() {
  // FORM STATES
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // SHOW / HIDE PASSWORD
  const [showPassword, setShowPassword] = useState(false);

  // ERROR MESSAGE
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");

    if (!email.trim()) {
      setError("Please enter your email");
      return;
    }

    if (!password.trim()) {
      setError("Please enter your password");
      return;
    }

    console.log("Login submitted");
    console.log("Email:", email);
    console.log("Password:", password);
  };

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
          <form onSubmit={handleSubmit} className="space-y-6">
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
            {error && (
              <p
                id="form-error"
                aria-live="assertive"
                className="text-sm text-red-500 font-medium"
              >
                ⚠ {error}
              </p>
            )}

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full bg-teal-600 text-white py-3 rounded-xl font-medium hover:bg-teal-700 transition shadow-md"
            >
              Login
            </button>
          </form>

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
