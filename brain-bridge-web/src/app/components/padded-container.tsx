export default function PaddedContainer({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) {
  return <div className="w-full h-full p-6">{children}</div>;
}
