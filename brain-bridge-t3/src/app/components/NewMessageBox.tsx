import { useCallback, useState } from "react";
import Input from "./Input";
import { AutoSizingTextArea } from "../(general)/profile/training/components/AutoSizingTextArea";

interface NewMessageBoxProps {
  onMessageSend: (text: string) => void;
}
export default function NewMessageBox({ onMessageSend }: NewMessageBoxProps) {
  const [currentMessageText, setCurrentMessageText] = useState("");

  const handleSend = useCallback(() => {
    onMessageSend(currentMessageText.trim());
  }, [currentMessageText, onMessageSend]);

  const handleKeyUp = useCallback(
    (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
      switch (event.key) {
        case "Enter":
          event.preventDefault();
          if (event.shiftKey) {
            // setCurrentMessageText(currentMessageText + "\n");
            return;
          } else {
            if (currentMessageText.trim().length === 0) return;
            handleSend();
            setCurrentMessageText("");
          }
      }
    },
    [currentMessageText, handleSend]
  );

  const handleTextChanged = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      // const lastCharacterIsNewline = event.target.value.endsWith("\n");
      // if (lastCharacterIsNewline) return;
      setCurrentMessageText(event.target.value);
    },
    []
  );

  return (
    <AutoSizingTextArea
      name="message"
      placeholder="Type your message here"
      className="mb-4 flex-grow rounded border bg-slate-400 dark:bg-slate-500 bg-opacity-95 p-2 shadow-inner outline-none"
      value={currentMessageText}
      onKeyUp={handleKeyUp}
      onChange={handleTextChanged}
    />
  );
}
