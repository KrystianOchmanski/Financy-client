import useSWR from "swr";
import { fetcher } from "../lib/fetcher";
import InfoCard from "./InfoCard";

export default function ExpensesCard() {
  const { data, error, isLoading, mutate } = useSWR(
    "/transaction/expenses?startDate=2025-01-01",
    fetcher
  );

  return <InfoCard title="Expenses" amount={data}></InfoCard>;
}
