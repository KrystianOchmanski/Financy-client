"use client";

import { useState } from "react";
import { AddAccountFormProps } from "../lib/definitions";
import { SubmitButton } from "../components/SubmitButton";
import { addAccount } from "./actions";

export default function AddAccountForm({
  onClose,
  onAccountAdded,
}: AddAccountFormProps) {
  const [name, setName] = useState("");
  const [startingBalance, setStartingBalance] = useState("");
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setErrors({});

    const result = await addAccount({ name, startingBalance });

    setIsLoading(false);

    if (!result.success) {
      setErrors(result.errors ?? {});
      return;
    }

    onAccountAdded();
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Add New Account</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Name</label>
            <input
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded"
            />
            {errors.name && <p className="text-red-500">{errors.name}</p>}
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium">Starting balance</label>
            <input
              type="number"
              name="startingBalance"
              value={startingBalance}
              onChange={(e) => setStartingBalance(e.target.value)}
              className="w-full p-2 border rounded"
            />
            {errors.startingBalance && (
              <p className="text-red-500">{errors.startingBalance}</p>
            )}
          </div>

          <div className="mt-6 flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
            >
              Cancel
            </button>
            <SubmitButton
              pending={isLoading}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Save
            </SubmitButton>
          </div>
        </form>
      </div>
    </div>
  );
}
