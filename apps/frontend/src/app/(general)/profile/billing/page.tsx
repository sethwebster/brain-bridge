import { redirect } from "next/navigation";

export default function BillingPage() {
  const currentYear = new Date().getFullYear();

  redirect(`/profile/billing/${currentYear}-01-01...${currentYear}-12-31`);
}
