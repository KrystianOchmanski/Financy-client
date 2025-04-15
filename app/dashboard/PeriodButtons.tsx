import { useEffect, useState } from "react";
import {
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
  subMonths,
  format,
} from "date-fns";
import { Period, PeriodButton } from "../lib/definitions";

type Props = {
  onPeriodSelect: (period: Period) => void;
};

export default function PeriodButtons({ onPeriodSelect }: Props) {
  const now = new Date();

  const initialButtons: PeriodButton[] = [
    {
      title: "This Month",
      period: {
        startDate: format(startOfMonth(now), "yyyy-MM-dd"),
        endDate: format(endOfMonth(now), "yyyy-MM-dd"),
      },
      selected: true,
    },
    {
      title: "Last Month",
      period: {
        startDate: format(startOfMonth(subMonths(now, 1)), "yyyy-MM-dd"),
        endDate: format(endOfMonth(subMonths(now, 1)), "yyyy-MM-dd"),
      },
      selected: false,
    },
    {
      title: "This Year",
      period: {
        startDate: format(startOfYear(now), "yyyy-MM-dd"),
        endDate: format(endOfYear(now), "yyyy-MM-dd"),
      },
      selected: false,
    },
    {
      title: "Last 12 months",
      period: {
        startDate: format(startOfMonth(subMonths(now, 12)), "yyyy-MM-dd"),
        endDate: format(endOfMonth(subMonths(now, 1)), "yyyy-MM-dd"),
      },
      selected: false,
    },
  ];

  const [buttons, setButtons] = useState<PeriodButton[]>(initialButtons);

  // <-- 1st render trigger
  useEffect(() => {
    const selectedButton = buttons.find((button) => button.selected);
    if (selectedButton) {
      onPeriodSelect(selectedButton.period);
    }
  }, []);

  const handleClick = (index: number) => {
    const updatedButtons = buttons.map((button, i) => ({
      ...button,
      selected: i === index,
    }));

    setButtons(updatedButtons);
    onPeriodSelect(updatedButtons[index].period);
  };

  return (
    <div className="inline-flex">
      {buttons.map((button, index) => (
        <button
          key={index}
          onClick={() => handleClick(index)}
          className={`p-2 
            ${button.selected ? "bg-blue-500 text-white" : "bg-gray-200"} 
            ${index === 0 ? "rounded-l" : ""} 
            ${index === buttons.length - 1 ? "rounded-r" : ""} 
            border border-gray-300`}
        >
          {button.title}
        </button>
      ))}
    </div>
  );
}
