import { ReactNode } from "react";
import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).trim(),
  password: z.string().trim(),
});

export const registerSchema = z.object({
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

export interface Transaction {
  id: number;
  amount: number;
  date: Date;
  description: string;
  type: number;
  accountId: number;
  accountName: string;
  categoryId: number;
  categoryName: string;
}

export interface Account {
  id: number;
  name: string;
  balance: number;
  transactions: Transaction[];
}

export const formatAmount = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

export interface MenuItemProps {
  href: string;
  label: string;
}

export interface InfoCardProps {
  title: string;
  amount: number;
  textColorClass?: string;
}

export interface Period {
  startDate: string;
  endDate: string;
}

export interface PeriodButton {
  title: string;
  period: Period;
  selected: boolean;
}

export interface PeriodButtonsProps {
  onPeriodSelect: (period: Period) => void;
}

export interface TransactionCardProps {
  title: string;
  endpoint: string;
  period: Period;
}
