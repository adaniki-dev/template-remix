import LoginPage from "@/entity/auth/view/login";
import { authenticator } from "@/services/auth.server";
import { sessionStorage } from "@/services/session.server";
import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
export default function Login() {
    return (
        <LoginPage />
    );
}

export async function action({ request }: ActionFunctionArgs) {
    try {
        // Authenticate the user

        const user = await authenticator.authenticate("credentials", request);

        // Get the session and set the user
        const session = await sessionStorage.getSession(request.headers.get("cookie"));
        session.set("user", user);

        // Redirect to the dashboard with the session
        return redirect("/", {
            headers: {
                "Set-Cookie": await sessionStorage.commitSession(session),
            },
        });
    } catch (error) {
        // Return error message for display
        return json({ error: error instanceof Error ? error.message : "Unknown error occurred" }, { status: 400 });
    }
}