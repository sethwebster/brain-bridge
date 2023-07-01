import { type Usage } from "@prisma/client";
import invariant from "tiny-invariant";

export interface MonthlyCosts {
  cost: number;
  count: number;
  month: string;
}

// 0.0000004
const BASE_PRICE = 4e-7;
// 1.5
const MARKUP = 1.5;

function markup(price: number): number {
  return price * MARKUP;
}

export function calculateCost(usage: Usage[]): Record<string, MonthlyCosts> {
  const costGroupedByMonth = (usage ?? []).reduce((acc, curr) => {
    const month = `${new Date(curr.createdAt).getFullYear()}-${
      new Date(curr.createdAt).getMonth() + 1
    }`;
    if (acc[month]) {
      const currMonth = acc[month];
      invariant(currMonth, "currMonth is undefined");
      currMonth.count += curr.count;
      currMonth.cost += markup(curr.count * BASE_PRICE);
    } else {
      acc[month] = {
        count: curr.count,
        cost: curr.count * 4e-7,
        month,
      };
    }
    return acc;
  }, {} as Record<string, MonthlyCosts>);

  return costGroupedByMonth;
}
