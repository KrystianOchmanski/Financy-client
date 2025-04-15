import useSWR from "swr";
import { fetcher } from "../lib/fetcher";
import InfoCard from "./InfoCard";

export default function IncomesCard() {
  const { data, error, isLoading, mutate } = useSWR(
    "/transaction/incomes?startDate=2025-01-01",
    fetcher
  );

  return <InfoCard title="Incomes" amount={data}></InfoCard>;
}
