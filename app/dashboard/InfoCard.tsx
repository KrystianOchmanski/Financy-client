import { formatAmount, InfoCardProps } from "../lib/definitions";

export default function InfoCard({
  title,
  amount,
  textColorClass = "text-gray-950",
}: InfoCardProps) {
  // skeleton loader
  if (amount === undefined) {
    return (
      <div className="p-6 bg-white rounded-xl">
        <h2 className="text-[14px] text-gray-600 mb-2">{title}</h2>
        <p className="font-semibold text-4xl text-transparent bg-gray-200 animate-pulse rounded-xl">
          &nbsp; {/* Keeping space while loading */}
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-xl">
      <h2 className="text-[14px] text-gray-600 mb-2">{title}</h2>
      <p className={`font-semibold text-4xl ${textColorClass}`}>
        ${formatAmount(amount)}
      </p>
    </div>
  );
}
