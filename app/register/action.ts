"use server";

import { z } from "zod";

const registerSchema = z.object({
  firstName: z
    .string()
    .trim()
    .max(30, { message: "Name must be at most 30 characters long." })
    .regex(/^[A-Za-z]+$/, { message: "Name can only contain letters." }),
  email: z.string().email({ message: "Invalid email address" }).trim(),
  password: z
    .string()
    .trim()
    .min(6, { message: "be at least 6 characters long." })
    .regex(/[!@#$%^&*(),.?":{}|<>]/, {
      message: "have at least one special character.",
    })
    .regex(/\d/, { message: "have at least one digit (0-9)." })
    .regex(/[a-z]/, {
      message: "have at least one lowercase letter (a-z).",
    })
    .regex(/[A-Z]/, {
      message: "have at least one uppercase letter (A-Z).",
    })
    .refine((password) => new Set(password).size > 1, {
      message: "use at least 1 different character.",
    }),
});

export async function register(prevState: any, formData: FormData) {
  const result = registerSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      errors: {
        firstName: result.error.flatten().fieldErrors.firstName || [],
        email: result.error.flatten().fieldErrors.email || [],
        password: result.error.flatten().fieldErrors.password || [],
      },
    };
  }

  const { firstName, email, password } = result.data;

  const response = await fetch(`${process.env.API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, firstName }),
  });

  if (!response.ok) {
    const errorMessages = await response.json();

    return {
      errors: {
        general: errorMessages,
      },
    };
  }

  return {
    success: "Registration successful. Redirecting...",
    redirect: "/login",
  };
}
