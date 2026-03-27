import { redirect } from "react-router";
import { getSession, destroySession } from "../.server/session";

export async function loader({ request }) {
  const session = await getSession(request.headers.get("Cookie"));

  return redirect("/login", {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
}
