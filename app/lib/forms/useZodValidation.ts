import { z } from 'zod';

type ValidationErrors = Record<string, string>;

export function useZodValidation<T>(schema: z.Schema<T>) {
    const validate = (values: unknown): ValidationErrors => {
        try {
            schema.parse(values);
            return {};
        } catch (err) {
            if (err instanceof z.ZodError) {
                return err.issues.reduce((acc, issue) => {
                    const path = Array.isArray(issue.path) ? issue.path.join('.') : issue.path[0];
                    acc[path] = issue.message;
                    return acc;
                }, {} as ValidationErrors);
            }
            return {};
        }
    };

    return { validate };
}