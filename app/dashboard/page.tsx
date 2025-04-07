"use client";

import { useState } from "react";
import api from "../lib/api";
import { useAuth } from "../hooks/useAuth";

interface Transaction {
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

interface Account {
  id: number;
  name: string;
  balance: number;
  transactions: Transaction[];
}

export default function Dashboard() {
  const [balance, setBalance] = useState(0);
  const { clearAccessToken } = useAuth();

  const getBalance = async () => {
    const response = await api.get("/account");
    const accounts = response.data as Account[];

    const totalBalance = accounts.reduce(
      (prev, next) => prev + next.balance,
      0
    );

    setBalance(totalBalance);
  };

  return (
    <main className="flex justify-center">
      <button
        className="px-3 py-2 bg-red-500 mt-3 mr-3 hover:bg-red-300"
        onClick={clearAccessToken}
      >
        Delete token
      </button>
      <button
        className="px-3 py-2 bg-blue-500 mt-3 hover:bg-blue-300"
        onClick={getBalance}
      >
        Get balance
      </button>
      <p className="block">Total balance {balance}</p>
    </main>
  );
}
