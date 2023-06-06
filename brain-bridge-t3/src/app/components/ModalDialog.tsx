import useKeypress from "react-use-keypress";

interface ModalProps {
  show: boolean;
  title: string;
  confirmText?: string;
  closeText?: string;
  icon?: React.ReactNode;
  children: React.ReactNode | React.ReactNode[];
  onCancel?: () => void;
  onConfirm?: () => void;
}

export default function Modal({
  show,
  title,
  icon,
  children,
  confirmText,
  closeText,
  onCancel,
  onConfirm,
}: ModalProps) {
  useKeypress("Escape", () => {
    if (show) onCancel?.();
  });
  if (!show) return <></>;
  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-all"></div>

      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-slate-50 text-left shadow-xl transition-all dark:bg-slate-300 sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-slate-50 px-4 pb-4 pt-5 dark:bg-slate-300 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-400 sm:mx-0 sm:h-10 sm:w-10">
                  {icon || (
                    <svg
                      className="h-6 w-6 text-red-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                      />
                    </svg>
                  )}
                </div>
                <div className="mt-3 w-full text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <h3
                    className="text-base font-semibold leading-6 text-gray-900"
                    id="modal-title"
                  >
                    {title}
                  </h3>
                  <div className="mt-2 w-full">{children}</div>
                </div>
              </div>
            </div>
            <div className="bg-slate-50 px-4 py-3 dark:bg-slate-400 sm:flex sm:flex-row-reverse sm:px-6">
              {onConfirm && (
                <button
                  type="button"
                  className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                  onClick={onConfirm || (() => void 0)}
                >
                  {confirmText}
                </button>
              )}
              {onCancel && (
                <button
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  onClick={onCancel || (() => void 0)}
                >
                  {closeText}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
