import { Usage } from "@prisma/client";
import invariant from "tiny-invariant";
import { type MonthlyCosts } from "~/lib/calculate-costs";
import { type DateRange } from "~/server/server-data";

interface BillingTableProps {
  dateRange: DateRange;
  usage: Record<string, MonthlyCosts>;
}

export default function BillingTable({ dateRange, usage }: BillingTableProps) {
  const startDate = new Date(dateRange.start); //.toDateString());
  const endDate = new Date(dateRange.end); //.toDateString());
  const offset = new Date(startDate).getTimezoneOffset() / 60;
  console.log("Offset", offset);
  startDate.setHours(0, 0, 0, 0);

  // endDate.setHours(offset, 0, 0, 0);
  // console.log("Date Range", { startDate, endDate });

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

  console.log(
    datesBetweenStartAndEnd[0],
    datesBetweenStartAndEnd[0].getUTCFullYear()
  );
  const moreThanOneYearInList =
    datesBetweenStartAndEnd[0].getUTCFullYear() !==
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    datesBetweenStartAndEnd[
      datesBetweenStartAndEnd.length - 1
    ]!.getUTCFullYear();

  const maxCost = Math.max(...Object.values(usage).map((month) => month.cost));
  const minCost = Math.min(
    ...[0, ...Object.values(usage).map((month) => month.cost)]
  );

  return (
    <div className="">
      <small className="flex flex-row">
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
      <ul
        className={`grid grid-cols-1 sm:grid-cols-${datesBetweenStartAndEnd.length.toString()} gap-4 pt-2 `}
      >
        {datesBetweenStartAndEnd.map((date) => (
          <li
            key={date.toString()}
            className="col-span-1 flex h-auto sm:h-96 flex-row justify-center  pb-2 text-center text-sm bg-slate-200 shadow-md"
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
              <div className="hidden h-full flex-row items-end justify-center border sm:flex">
                <div
                  style={{
                    height: `${
                      ((
                        usage[
                          `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}`
                        ] ?? {
                          cost: 0.0001,
                        }
                      ).cost /
                        maxCost) *
                      100
                    }%`,
                  }}
                  className="w-2 bg-green-400 bg-opacity-70 rounded-md"
                ></div>
              </div>
              <div className="text-sm">
                $
                {`${(
                  usage[
                    `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}`
                  ] ?? {
                    cost: 0.0001,
                  }
                ).cost.toFixed(2)}`}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function DateRangeDisplay({
  dateRange,
  moreThanOneYearInList,
}: {
  dateRange: DateRange;
  moreThanOneYearInList: boolean;
}) {
  const startDate = new Date(dateRange.start); //.toDateString());
  const endDate = new Date(dateRange.end); //.toDateString());
  return (
    <div className="flex flex-row">
      <div>
        {startDate.toLocaleDateString(
          "en-US",
          moreThanOneYearInList
            ? {
                timeZone: "US/Eastern",
                month: "short",
                year: "numeric",
              }
            : {
                month: "short",
              }
        )}
      </div>
      &#8212;
      <div>
        {endDate.toLocaleDateString("en-US", {
          month: "short",
          year: "numeric",
        })}
      </div>
    </div>
  );
}
