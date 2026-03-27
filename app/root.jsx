import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
  useNavigate,
} from "react-router";

import "./app.css";
import { useState, useEffect } from "react";
import { NavLink } from "react-router";

/* ---------------- META + LINKS ---------------- */

export const links = () => [
  { rel: "icon", type: "image/svg+xml", href: "/logo.svg" },
  { rel: "icon", type: "image/png", href: "/logo.png" },

  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export const meta = () => [
  { title: "SilentBridge" },
  { name: "description", content: "Practice sign language effectively" },
  { name: "viewport", content: "width=device-width, initial-scale=1" },
];

/* ---------------- LAYOUT ---------------- */

export function Layout({ children }) {
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window === "undefined") return false;
    const savedTheme = window.localStorage.getItem("theme");
    if (savedTheme) return savedTheme === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });
  const [mobileMenu, setMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  // TEMP auth
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const isPublicRoute = [
    "/",
    "/learn",
    "/community",
    "/about",
    "/login",
    "/register",
  ].some(
    (route) =>
      location.pathname === route || location.pathname.startsWith(`${route}/`),
  );
  const showPublicNav = !isLoggedIn || isPublicRoute;
  const showPrivateNav = isLoggedIn && !isPublicRoute;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    window.localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    setMobileMenu(false);
  }, [location.pathname]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-teal-600 dark:text-teal-400"
      : "text-slate-700 dark:text-slate-300 hover:text-teal-600 transition";

  const navigate = useNavigate();

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>

      <body className="bg-slate-50 text-slate-800 dark:bg-slate-900 dark:text-slate-100 min-h-screen">
        {/* NAVBAR */}
        <nav
          className={`sticky top-0 z-50 backdrop-blur-md transition-all duration-300
          bg-white/80 dark:bg-slate-900/80
          border-b border-teal-100 dark:border-teal-900
          ${scrolled ? "shadow-lg" : "shadow-none"}`}
        >
          <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
            {/* LOGO */}
            <NavLink to="/" className="flex items-center gap-2">
              <img
                src="/logo.svg"
                alt="SilentBridge logo"
                className="w-8 h-8"
              />
              <span className="text-xl font-bold text-teal-600 dark:text-teal-400">
                SilentBridge
              </span>
            </NavLink>

            {/* DESKTOP NAV */}
            <div className="hidden md:flex gap-6 items-center text-sm font-medium">
              {showPublicNav && (
                <>
                  <NavLink to="/" end className={navLinkClass}>
                    Home
                  </NavLink>
                  <NavLink to="/learn" className={navLinkClass}>
                    Learn
                  </NavLink>
                  <NavLink to="/community" className={navLinkClass}>
                    Community
                  </NavLink>
                  <NavLink to="/about" className={navLinkClass}>
                    About
                  </NavLink>
                  <NavLink to="/login" className={navLinkClass}>
                    Login
                  </NavLink>
                  <NavLink
                    to="/register"
                    className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700"
                  >
                    Register
                  </NavLink>
                </>
              )}

              {showPrivateNav && (
                <>
                  <NavLink to="/dashboard" className={navLinkClass}>
                    Dashboard
                  </NavLink>
                  <NavLink to="/add-sign" className={navLinkClass}>
                    Add Sign
                  </NavLink>
                  <NavLink to="/my-signs" className={navLinkClass}>
                    My Signs
                  </NavLink>
                  <NavLink to="/practice" className={navLinkClass}>
                    Practice
                  </NavLink>

                  <NavLink to="/" end className={navLinkClass}>
                    Home
                  </NavLink>

                  <button
                    onClick={() => navigate("/logout")}
                    className="text-red-500 cursor-pointer"
                  >
                    Logout
                  </button>
                </>
              )}

              {/* DARK MODE */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full hover:bg-teal-100 dark:hover:bg-slate-800 transition"
                aria-label="Toggle dark mode"
              >
                {mounted && (darkMode ? "☀️" : "🌙")}
              </button>
            </div>

            {/* MOBILE BUTTON */}
            <button
              className="md:hidden text-xl"
              onClick={() => setMobileMenu(!mobileMenu)}
              aria-expanded={mobileMenu}
              aria-controls="mobile-nav"
              aria-label="Toggle navigation menu"
            >
              {mobileMenu ? "✕" : "☰"}
            </button>
          </div>

          {/* ✅ MOBILE MENU (THIS WAS MISSING) */}
          {mobileMenu && (
            <div
              id="mobile-nav"
              className="md:hidden px-6 pb-4 space-y-3 text-sm font-medium"
            >
              {showPublicNav && (
                <>
                  <NavLink
                    to="/"
                    className="block"
                    onClick={() => setMobileMenu(false)}
                  >
                    Home
                  </NavLink>
                  <NavLink
                    to="/learn"
                    className="block"
                    onClick={() => setMobileMenu(false)}
                  >
                    Learn
                  </NavLink>
                  <NavLink
                    to="/community"
                    className="block"
                    onClick={() => setMobileMenu(false)}
                  >
                    Community
                  </NavLink>
                  <NavLink
                    to="/about"
                    className="block"
                    onClick={() => setMobileMenu(false)}
                  >
                    About
                  </NavLink>
                  <NavLink
                    to="/login"
                    className="block"
                    onClick={() => setMobileMenu(false)}
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/register"
                    className="block"
                    onClick={() => setMobileMenu(false)}
                  >
                    Register
                  </NavLink>
                </>
              )}

              {showPrivateNav && (
                <>
                  <NavLink
                    to="/dashboard"
                    className="block"
                    onClick={() => setMobileMenu(false)}
                  >
                    Dashboard
                  </NavLink>
                  <NavLink
                    to="/add-sign"
                    className="block"
                    onClick={() => setMobileMenu(false)}
                  >
                    Add Sign
                  </NavLink>
                  <NavLink
                    to="/my-signs"
                    className="block"
                    onClick={() => setMobileMenu(false)}
                  >
                    My Signs
                  </NavLink>
                  <NavLink
                    to="/practice"
                    className="block"
                    onClick={() => setMobileMenu(false)}
                  >
                    Practice
                  </NavLink>
                  <NavLink
                    to="/"
                    className="block"
                    onClick={() => setMobileMenu(false)}
                  >
                    Home
                  </NavLink>

                  <button
                    onClick={() => {
                      setIsLoggedIn(false);
                      setMobileMenu(false);
                    }}
                    className="block text-red-500"
                  >
                    Logout
                  </button>
                </>
              )}

              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full hover:bg-teal-100 dark:hover:bg-slate-800 transition"
                aria-label="Toggle dark mode"
              >
                {mounted && (darkMode ? "☀️" : "🌙")}
              </button>
            </div>
          )}
        </nav>

        {/* MAIN */}
        <main className="max-w-6xl mx-auto px-6 py-10">{children}</main>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

/* ROOT */
export default function App() {
  return <Outlet />;
}

/* ERROR */
export function ErrorBoundary({ error }) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>

      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
