import { useState } from "react";
import { Link } from "react-router";

export default function Register() {
  // FORM STATES
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  // ERROR MESSAGE STATE
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // clear previous error
    setError("");

    // basic validation
    if (!name.trim()) {
      setError("Please enter your name");
      return;
    }

    if (!email.trim()) {
      setError("Please enter your email");
      return;
    }

    if (!password.trim()) {
      setError("Please enter a password");
      return;
    }

    if (!confirmPassword.trim()) {
      setError("Please confirm your password");
      return;
    }

    // check passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // temporary success (backend later)
    console.log("Register submitted:");
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Password:", password);
  };

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
          <form onSubmit={handleSubmit} className="space-y-6">
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
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                type={showPassword ? "text" : "password"}
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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

            {error && (
              <p
                className="text-sm text-red-500 font-medium"
                aria-live="assertive"
              >
                ⚠ {error}
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
          </form>

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
