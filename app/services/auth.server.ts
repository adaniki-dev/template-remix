import { Authenticator } from "remix-auth";
import { FormStrategy } from "remix-auth-form";

export interface User {
    id: string;
    email: string;
    name: string;
    auth: {
        accessToken: string;
        refreshToken: string;
    };
}

export const authenticator = new Authenticator<User>();

const BACKEND_URL = process.env.BACKEND_URL;
const API_KEY = process.env.API_KEY;

authenticator.use(
    new FormStrategy(async ({ form }) => {
        const email = form.get("email") as string;
        const password = form.get("senha") as string;

        if (!email || !password) {
            throw new Error("Credenciais inválidas");
        }

        try {
            const response = await fetch(`${BACKEND_URL}signin`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": API_KEY || "",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            if (response.status === 502) {
                throw new Error("Serviço indisponível, tente novamente mais tarde.");
            }
            if (!response.ok) {
                throw new Error("Seu E-mail e senha está inválidas, tente novamente.");
            }

            const userData = await response.json();
            return {
                ...userData,
                id: userData.id,
                email: userData.email,
                name: userData.name,
            };
        } catch (error) {
            throw new Error("Seu E-mail e senha está inválidas, tente novamente.");
        }
    }),
    "credentials"
);