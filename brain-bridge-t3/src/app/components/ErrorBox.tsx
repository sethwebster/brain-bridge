export default function ErrorBox({
  title,
  message,
}: {
  title: string;
  message: string;
}) {
  return (
    <div
      className="relative px-4 py-3 mt-2 text-red-700 bg-red-100 border border-red-400 rounded-md"
      role="alert"
    >
      <header className="font-bold">{title}</header>
      <span className="block sm:inline">{message}</span>
    </div>
  );
}
