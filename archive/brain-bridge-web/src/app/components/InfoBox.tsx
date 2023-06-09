"use client";
//TODO: Figure out why this fails hydration when loaded directly
import useLocalStorage from "@/utils/use-local-storage";
import { Suspense, useCallback } from "react";
import invariant from "tiny-invariant";

type InfoBoxProps = {
  title: string;
  body?: string;
  dismissable?: boolean;
  children?: React.ReactNode;
} & (
  | {
      dismissable: true;
      dismissableId: string;
    }
  | {
      dismissable: false;
    }
);

function InfoBoxDisplay(
  props: InfoBoxProps & { hidden: boolean; handleDismiss: () => void }
) {
  const { title, dismissable, hidden, handleDismiss } = props;

  if (hidden) return <></>;
  return (
    <div
      className={`relative px-4 py-3 mt-2 mb-2 border rounded-md text-amber-700 bg-amber-100 border-amber-yellow-400`}
      role="alert"
    >
      <header className="flex flex-row justify-between font-bold">
        <div>{title}</div>
        {dismissable && <button onClick={handleDismiss}>✕</button>}
      </header>
      <span className="block sm:inline">
        {props.body} {props.children}
      </span>
    </div>
  );
}

function InfoBoxDismissable(props: InfoBoxProps) {
  const { dismissable } = props;
  invariant(dismissable, "InfoBoxDismissable must be dismissable");
  invariant(
    props.dismissableId,
    "InfoBoxDismissable must have a dismissableId"
  );
  const [storedValue, setStoredValue] = useLocalStorage(
    props.dismissableId,
    false
  );

  const handleDismiss = useCallback(() => {
    setStoredValue(true);
  }, [setStoredValue]);

  return (
    <InfoBoxDisplay
      {...props}
      hidden={typeof storedValue === "undefined" || storedValue === true}
      handleDismiss={handleDismiss}
    />
  );
}

export default function InfoBox(props: InfoBoxProps) {
  const { dismissable } = props;

  return (
    <>
      {dismissable ? (
        <Suspense fallback={null}>
          <InfoBoxDismissable {...props} />
        </Suspense>
      ) : (
        <Suspense fallback={null}>
          <InfoBoxDisplay {...props} hidden={false} handleDismiss={() => {}} />
        </Suspense>
      )}
    </>
  );
}
