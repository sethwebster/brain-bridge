import { getServerSession } from "~/server/auth";
import ServerData, { type DateRange } from "~/server/server-data";
import BillingTable from "../components/BillingTable";
import invariant from "tiny-invariant";
import ContentBoxWithHeading from "../../components/ContentBoxWithHeading";

export default async function BillingPage({
  params: { dateRange },
}: {
  params: { dateRange: string };
}) {
  const session = await getServerSession();
  invariant(session, "Session must exist");
  invariant(dateRange[0], "Date range must exist");
  const range = dateRange[0].split("...").map((date) => new Date(date));
  const dateRangeInstance: DateRange = {
    start: range[0] ?? new Date("01-01-2023"),
    end: range[1] ?? new Date("12-31-2023"),
  };
  const usage = await ServerData.fetchCurrentCosts(dateRangeInstance);

  return (
    <ContentBoxWithHeading heading={<h1 className="text-xl">Billing</h1>}>
      <div className="mt-6 bg-slate-100">
      <BillingTable dateRange={dateRangeInstance} usage={usage} />
      </div>
    </ContentBoxWithHeading>
  );
}
