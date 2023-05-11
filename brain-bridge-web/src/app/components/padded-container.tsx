export default function PaddedContainer({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) {
  return <div className="p-6">{children}</div>;
}
