export default function SideBarPaddedContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="w-full h-auto min-h-full overflow-scroll bg-slate-100 dark:bg-slate-700">{children}</div>;
}
