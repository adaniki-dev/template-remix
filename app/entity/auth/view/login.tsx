import { useSearchParams } from "@remix-run/react";
import LoginForm from "../components/loginForm";
import { Card } from "@/components/ui/card";

export default function LoginPage() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    return (
        <main className="flex flex-col xl:flex-row items-center bg-cover justify-start xl:justify-center gap-0 h-screen xl:gap-50">
            <div className="flex-col flex w-full xl:w-auto p-6">
                <fieldset className="pr-0 xl:pr-16 rounded-2xl w-full xl:w-[560px]">
                    <Card>
                        <LoginForm />
                    </Card>
                </fieldset>
            </div>
        </main>
    );
}