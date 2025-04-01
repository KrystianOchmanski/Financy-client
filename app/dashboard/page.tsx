import api from "../api/api";

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

export default async function Dashboard() {
  // const accounts = (await api.get("account")).data as Account[];

  // const totalBalance = accounts.reduce(
  //   (sum, account) => sum + account.balance,
  //   0
  // );

  return (
    <main className="flex justify-center">
      {/* <div className="w-7xl py-12 px-8">Balance: {totalBalance}</div> */}
    </main>
  );
}
