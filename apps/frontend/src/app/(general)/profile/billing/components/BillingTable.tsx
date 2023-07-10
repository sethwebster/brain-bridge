import invariant from "tiny-invariant";
import { type MonthlyCosts } from "@/lib/calculate-costs";
import { type DateRange } from "@/server/server-data";
import { DateRangeDisplay } from "./DateRangeDisplay";
import { BillingGrid } from "./BillingGrid";

interface BillingTableProps {
  dateRange: DateRange;
  usage: Record<string, MonthlyCosts>;
}

export default function BillingTable({ dateRange, usage }: BillingTableProps) {
  const startDate = new Date(dateRange.start); //.toDateString());
  const endDate = new Date(dateRange.end); //.toDateString());
  startDate.setHours(0, 0, 0, 0);

  let datesBetweenStartAndEnd: Date[] = [];
  let currentDate = startDate;

  while (currentDate <= endDate) {
    datesBetweenStartAndEnd.push(currentDate);
    currentDate = new Date(
      currentDate.getUTCFullYear(),
      currentDate.getUTCMonth() + 1,
      1
    );
  }

  datesBetweenStartAndEnd = datesBetweenStartAndEnd.slice(1);

  if (datesBetweenStartAndEnd.length === 0) {
    return (
      <div className="">
        <h1>Invalid Date Range</h1>
      </div>
    );
  }
  invariant(datesBetweenStartAndEnd[0]);
  invariant(datesBetweenStartAndEnd[datesBetweenStartAndEnd.length - 1]);

  const moreThanOneYearInList =
    datesBetweenStartAndEnd[0].getUTCFullYear() !==
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    datesBetweenStartAndEnd[
      datesBetweenStartAndEnd.length - 1
    ]!.getUTCFullYear();

  const maxCost = Math.max(...Object.values(usage).map((month) => month.cost));
  // const minCost = Math.min(
  //   ...[0, ...Object.values(usage).map((month) => month.cost)]
  // );

  return (
    <div className="">
      <small className="flex flex-row dark:bg-slate-700">
        <h2>Date Range:</h2>
        &nbsp;
        <DateRangeDisplay
          dateRange={{
            start: datesBetweenStartAndEnd[0],
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            end: datesBetweenStartAndEnd[datesBetweenStartAndEnd.length - 1]!,
          }}
          moreThanOneYearInList={moreThanOneYearInList}
        />
      </small>
      <BillingGrid
        datesBetweenStartAndEnd={datesBetweenStartAndEnd}
        moreThanOneYearInList={moreThanOneYearInList}
        usage={usage}
        maxCost={maxCost}
      />
    </div>
  );
}


