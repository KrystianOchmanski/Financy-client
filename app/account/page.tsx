"use client";

import useSWR from "swr";
import { useState } from "react";
import { Account, formatAmount } from "../lib/definitions";
import { fetcher } from "../lib/fetcher";
import toast from "react-hot-toast";
import AddAccountModalForm from "./AddAccountModalForm";

export default function AccountPage() {
  const { data, error, isLoading, mutate } = useSWR<Account[]>(
    "/account",
    fetcher
  );
  const [showModal, setShowModal] = useState(false);

  if (isLoading) return <p className="text-gray-500">Loading...</p>;
  if (error) return <p className="text-red-500">Error loading accounts</p>;

  return (
    <>
    
      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Add account
      </button>

      <ul className="mt-4 space-y-2">
        {data?.map((account) => (
          <li key={account.id} className="border p-2 rounded shadow-sm">
            <strong>{account.name}</strong>: ${formatAmount(account.balance)}
          </li>
        ))}
      </ul>

      {showModal && (
        <AddAccountModalForm
          onClose={() => setShowModal(false)}
          onAccountAdded={() => {
            mutate();
            toast.success("Account added successfully!");
          }}
        />
      )}
    </>
  );
}
