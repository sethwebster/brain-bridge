import { useCallback, useState } from "react";

interface NewMessageBoxProps {
  onMessageSend: (text: string) => void;
}
export default function NewMessageBox({ onMessageSend }: NewMessageBoxProps) {
  const [currentMessageText, setCurrentMessageText] = useState("");

  const handleSend = useCallback(
    () => {
      onMessageSend(currentMessageText);
    },
    [currentMessageText, onMessageSend]
  );

  const handleKeyUp = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      event.preventDefault();
      if (event.key === "Enter") {
        handleSend();
        setCurrentMessageText("");
      }
    },
    [handleSend]
  );

  const handleTextChanged = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setCurrentMessageText(event.target.value);
    },
    []
  );

  return (
    <div className="sticky bottom-0 w-full p-2 mt-4 bg-opacity-0 outline-none">
      <input
        type="text"
        name="message"
        placeholder="Type your message here"
        className="sticky w-full h-auto p-2 mb-4 border rounded shadow-inner outline-none bg-slate-100 dark:bg-slate-900 border-slate-600 bg-opacity-95"
        value={currentMessageText}
        onKeyUp={handleKeyUp}
        onChange={handleTextChanged}
      />
    </div>
  );
}
