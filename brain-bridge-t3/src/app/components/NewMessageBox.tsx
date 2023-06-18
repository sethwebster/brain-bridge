import { useCallback, useRef, useState } from "react";
import Input from "./Input";
import AutoSizingTextArea from "../(general)/profile/training/components/AutoSizingTextArea";

interface NewMessageBoxProps {
  onMessageSend: (text: string) => void;
  isConnected: boolean;
}

export default function NewMessageBox({
  onMessageSend,
  isConnected,
}: NewMessageBoxProps) {
  const [currentMessageText, setCurrentMessageText] = useState("");
  const textRef = useRef<HTMLTextAreaElement>(null);
  const handleSend = useCallback(() => {
    onMessageSend(currentMessageText.trim());
  }, [currentMessageText, onMessageSend]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
      // if (ALL_POSSIBLE_TYPEABLE_CHARACTERS.includes(event.key)) {
      //   setCurrentMessageText((text) => text + event.key);
      //   return;
      // }
      switch (event.key) {
        case "Enter":
          event.preventDefault();
          if (event.shiftKey) {
            setCurrentMessageText(currentMessageText + "\n");
            return;
          } else {
            if (currentMessageText.trim().length === 0) return;
            handleSend();
            setCurrentMessageText("");
          }
          break;
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
      disabled={!isConnected}
      ref={textRef}
      name="message"
      placeholder={isConnected ? "Type your message here" : "Offline"}
      className="transition-all mb-4 flex-grow rounded border bg-slate-400 bg-opacity-95 p-2 shadow-inner outline-none disabled:opacity-50 dark:bg-slate-500"
      value={currentMessageText}
      onKeyDown={handleKeyDown}
      onChange={handleTextChanged}
    />
  );
}
