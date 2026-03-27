import { createCookieSessionStorage, redirect } from "react-router";

/* ---------------- SESSION STORAGE ---------------- */

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secrets: [process.env.SESSION_SECRET],
    secure: process.env.NODE_ENV === "production",
  },
});

/* ---------------- HELPERS ---------------- */

// get session from request
export async function getSession(cookie) {
  return sessionStorage.getSession(cookie);
}

// commit session (save cookie)
export async function commitSession(session) {
  return sessionStorage.commitSession(session);
}

// destroy session (logout)
export async function destroySession(session) {
  return sessionStorage.destroySession(session);
}

/* ---------------- AUTH HELPERS ---------------- */

// get logged-in user id
export async function getUserId(request) {
  let session = await getSession(request.headers.get("Cookie"));
  return session.get("userId");
}

// require user (protect routes)
export async function requireUser(request) {
  let userId = await getUserId(request);

  if (!userId) {
    throw redirect("/login");
  }

  return userId;
}
