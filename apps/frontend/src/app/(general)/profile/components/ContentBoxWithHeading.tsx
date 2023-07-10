export default function ContentBoxWithHeading({
  children,
  heading,
}: {
  heading: string | React.ReactNode;
  children: React.ReactNode;
}) {

  const headingComponent = typeof heading === "string" ? <h2 className="text-xl">{heading}</h2> : heading;

  return <div className="w-full h-full p-4">
    <header className="flex justify-between pb-2">
      {headingComponent}
    </header>
    <div className="h-[calc(100%-120px)] overflow-scroll">
    {children}
    </div>
  </div>;
}
