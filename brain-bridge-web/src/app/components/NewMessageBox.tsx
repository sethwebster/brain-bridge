import { useCallback, useRef, useState } from "react";
import AutoSizingTextArea from "../../base-components/AutoSizingTextArea";

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
      autoFocus
      disabled={!isConnected}
      ref={textRef}
      name="message"
      placeholder={isConnected ? "Type your message here" : "Offline"}
      className="w-full p-2 mb-4 transition-all border rounded shadow-lg outline-none f text-slate-50 bg-slate-400 bg-opacity-95 disabled:opacity-50 disabled:bg-red-700 dark:bg-slate-500"
      value={currentMessageText}
      onKeyDown={handleKeyDown}
      onChange={handleTextChanged}
    />
  );
}
