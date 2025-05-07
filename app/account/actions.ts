"use client";

import api from "../lib/api";
import { addAccountSchema } from "../lib/definitions";

export async function addAccount(input: {
  name: string;
  startingBalance: number;
}) {
  const parseResult = addAccountSchema.safeParse({
    name: input.name,
    startingBalance: input.startingBalance,
  });

  if (!parseResult.success) {
    return {
      errors: parseResult.error.flatten().fieldErrors,
    };
  }

  try {
    const response = await api.post("/account", parseResult.data);
    console.log(response);

    if (response.status != 201) {
      return {
        errors: {
          name: ["Failed to create account"],
        },
      };
    }

    return { success: true };
  } catch (e: any) {
    return {
      success: false,
      errors: {
        name: [""],
        startingBalance: ["Server error"],
      },
    };
  }
}
