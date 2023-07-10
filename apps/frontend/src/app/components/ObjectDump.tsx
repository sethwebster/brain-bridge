export default function ObjectDump({ object }: { object: object }) {
  return <pre>{JSON.stringify(object, null, 2)}</pre>;
}
