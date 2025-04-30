"use client";

import { useState } from "react";
import { fetcher } from "../lib/fetcher";
import { Account } from "../lib/definitions";
import useSWR from "swr";
import api from "../lib/api";

export default function AccountPage() {
  const { data, error, isLoading, mutate } = useSWR<Account[]>(
    "/account",
    fetcher
  );
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [balance, setBalance] = useState("");

  const handleAddAccount = async () => {
    try {
      const res = await api.post("/account", {
        name,
        startingBalance: parseFloat(balance),
      });

      if (res.status != 201) throw new Error("Failed to add account");

      setShowModal(false);
      setName("");
      setBalance("");
      mutate();
    } catch (error) {
      console.error("Add account error:", error);
    }
  };

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
            <strong>{account.name}</strong>: ${account.balance.toFixed(2)}
          </li>
        ))}
      </ul>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Add New Account</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Balance
                </label>
                <input
                  type="number"
                  value={balance}
                  onChange={(e) => setBalance(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleAddAccount}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
