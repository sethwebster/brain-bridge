import { type DateRange } from "@/server/server-data";

export function DateRangeDisplay({
  dateRange, moreThanOneYearInList,
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
