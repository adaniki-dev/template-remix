import { Form, useZodValidation } from "@/lib/forms";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { z } from "zod";
import InputField from "@/lib/forms/fields/inputField";
import { useLocation } from "@remix-run/react";

const SignupSchema = z.object({
    email: z.string({ required_error: "Obrigatório" }).email("E-mail inválido"),
    senha: z
        .string({ required_error: "Obrigatório" })
        .min(6, "A senha deve ter pelo menos 6 caracteres"),
});

export default function LoginForm() {
    const { validate } = useZodValidation(SignupSchema);
    const location = useLocation();

    return (
        <CardContent>
            <div className="flex flex-col items-center justify-center">
                <img
                    src="/logo-dark.png"
                    width={160}
                    height={160}
                    alt="logo"
                    className="w-40 mb-3 mt-6"
                />
                <p className="text-center mb-3">
                    Para entrar ou registrar uma nova conta, por favor insira seu e-mail
                </p>
            </div>

            <Form
                method="post"
                action={'/?index'}
                initialValues={{
                    email: "",
                    senha: "",
                }}
                validate={validate}
            >
                <div className="flex flex-col gap-3">
                    <div>
                        <InputField
                            placeholder="Coloque seu e-mail"
                            name="email"
                            type="email"
                            label="E-mail"
                        />
                    </div>
                    <div>
                        <InputField
                            placeholder="Coloque sua senha"
                            name="senha"
                            type="password"
                            label="Senha"
                        />
                    </div>
                    <Button type="submit">
                        Entrar
                    </Button>
                    <a
                        className="text-primary text-center items-center flex justify-center"
                        href="/recuperar-senha"
                    >
                        Esqueceu sua senha?
                    </a>
                </div>
            </Form>
        </CardContent>
    );
}