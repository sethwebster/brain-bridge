export default function ContentBoxWithHeading({
  children,
  heading,
}: {
  heading: string | React.ReactNode;
  children: React.ReactNode;
}) {

  const headingComponent = typeof heading === "string" ? <h2 className="text-xl">{heading}</h2> : heading;

  return <div className="h-full w-full p-4 mt-20">
    <header className="flex justify-between pb-2">
      {headingComponent}
    </header>
    {children}
  </div>;
}
