import LoginPage from "@/entity/auth/view/login";
import { authenticator } from "@/services/auth.server";
import { sessionStorage } from "@/services/session.server";
import { ActionFunctionArgs, json, redirect, LoaderFunctionArgs } from "@remix-run/node";

export default function Login() {
  return (
    <LoginPage />
  );
}

export async function action({ request }: ActionFunctionArgs) {
  try {

    const user = await authenticator.authenticate("credentials", request);

    const session = await sessionStorage.getSession(request.headers.get("cookie"));
    session.set("user", user);

    return redirect("/", {
      headers: {
        "Set-Cookie": await sessionStorage.commitSession(session),
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error occurred" }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        }
      }
    );
  }
}