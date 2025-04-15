import { formatAmount } from "../lib/definitions";

interface InfoCardProps {
  title: string;
  amount: number;
  textColorClass?: string;
}

export default function InfoCard({
  title,
  amount,
  textColorClass = "text-gray-950",
}: InfoCardProps) {
  return (
    <div className="p-6 bg-white rounded-xl">
      <h2 className="text-[14px] text-gray-600 mb-2">{title}</h2>
      <p className={`font-semibold text-4xl ${textColorClass}`}>
        ${formatAmount(amount)}
      </p>
    </div>
  );
}
