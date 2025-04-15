"use client";

import ExpensesCard from "./ExpensesCard";
import IncomesCard from "./IncomesCard";
import TotalBalanceCard from "./TotalBalanceCard";

export default function Dashboard() {
  return (
    <div className="w-7xl px-8 grid grid-cols-3 gap-8 mt-8">
      <TotalBalanceCard></TotalBalanceCard>
      <IncomesCard></IncomesCard>
      <ExpensesCard></ExpensesCard>
    </div>
  );
}
