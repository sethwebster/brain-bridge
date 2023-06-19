import { type MonthlyCosts } from "~/lib/calculate-costs";

export function BillingGrid({
  datesBetweenStartAndEnd, moreThanOneYearInList, usage, maxCost,
}: {
  datesBetweenStartAndEnd: Date[];
  moreThanOneYearInList: boolean;
  usage: Record<string, MonthlyCosts>;
  maxCost: number;
}) {
  return (
    <ul
      className={`grid grid-cols-1 sm:grid-cols-${datesBetweenStartAndEnd.length.toString()} gap-4 p-2 bg-slate-100 dark:bg-slate-700`}
    >
      {datesBetweenStartAndEnd.map((date) => (
        <li
          key={date.toString()}
          className="col-span-1 flex h-auto flex-row justify-center bg-slate-200 dark:bg-slate-400  pb-2 text-center text-sm shadow-md sm:h-96 rounded-sm"
        >
          <div className="flex h-full flex-col">
            <div className="border-b">
              {date.toLocaleDateString(
                "en-US",
                moreThanOneYearInList
                  ? {
                    month: "short",
                    year: "numeric",
                  }
                  : {
                    month: "short",
                  }
              )}
            </div>
            <div className="hidden h-full flex-row items-end justify-center sm:flex pt-1">
              <div
                style={{
                  height: `${((
                      usage[`${date.getUTCFullYear()}-${date.getUTCMonth() + 1}`] ?? {
                        cost: 0.0001,
                      }
                    ).cost /
                      maxCost) *
                    100}%`,
                }}
                className="w-2 rounded-md bg-green-400 bg-opacity-70"
              ></div>
            </div>
            <div className="text-sm">
              $
              {`${(
                usage[`${date.getUTCFullYear()}-${date.getUTCMonth() + 1}`] ?? {
                  cost: 0.0001,
                }
              ).cost.toFixed(2)}`}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
