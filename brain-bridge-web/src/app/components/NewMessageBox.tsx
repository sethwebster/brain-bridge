import { useCallback, useState } from "react";
import Input from "./Input";

interface NewMessageBoxProps {
  onMessageSend: (text: string) => void;
}
export default function NewMessageBox({ onMessageSend }: NewMessageBoxProps) {
  const [currentMessageText, setCurrentMessageText] = useState("");

  const handleSend = useCallback(() => {
    onMessageSend(currentMessageText);
  }, [currentMessageText, onMessageSend]);

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
    <Input
      type="text"
      name="message"
      placeholder="Type your message here"
      className="flex-grow p-2 mb-4 border rounded shadow-inner outline-none bg-opacity-95"
      value={currentMessageText}
      onKeyUp={handleKeyUp}
      onChange={handleTextChanged}
    />
  );
}
