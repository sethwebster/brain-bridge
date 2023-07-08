import { useEffect, useRef } from "react";

// Updates the height of a <textarea> when the value changes.
const useAutosizeTextArea = (
  textAreaRef: HTMLTextAreaElement,
  value: string,
  maxHeight?: number
) => {
  const previous = useRef<number>(-1);
  useEffect(() => {
    if (textAreaRef) {
      if (previous.current === -1) {
        previous.current = textAreaRef.scrollHeight;
      }
      // We need to reset the height momentarily to get the correct scrollHeight for the textarea
      textAreaRef.style.height = "0px";
      const scrollHeight = textAreaRef.scrollHeight;

      // We then set the height directly, outside of the render loop
      // Trying to set this with state or a textAreaRef will product an incorrect value.

      textAreaRef.style.height = (value.length === 0) ? `${previous.current}px` : `${Math.min(scrollHeight, maxHeight || 100000)}px`;
    }
  }, [maxHeight, textAreaRef, value]);
};

export default useAutosizeTextArea;
