import generateId from "~/utils/generate-id";

export type PartialJSONObject = { [key: string]: unknown };

class StreamingJsonParser {
  id = generateId();
  private buffer = '';
  private objectBuffer: PartialJSONObject | PartialJSONObject[] = {};
  private currentKey: string | null = null;
  private lastPosition = 0;
  private stack: string[] = [];
  private isCapturingValue = false;

  log(...args: unknown[]) {
    console.log(`[${this.id}]`, ...args);
  }

  consume(chunk: string): void {
    let rebuffer = this.buffer;

    this.buffer += chunk;

    let index = this.lastPosition;

    let previousChar = this.buffer[index - 1] ?? "";

    while (index < this.buffer.length) {
      const char = this.buffer[index];
      
      if (char === "{") {
        this.stack.push("}");
        if (previousChar === "}") {
          // A second object was sent, without a comma
          if (this.buffer[0] !== "[") {
            // This was not sent as an array
            rebuffer = `[${rebuffer}`;
            index += 1;
          }
          rebuffer += ",";
          index += 1;
        }
      } else if (char === "[") {
        this.stack.push("]");
      } else if (char === "}") {
        if (this.stack[this.stack.length - 1] === "}") {
          this.stack.pop();
        }
      } else if (char === "]") {
        if (this.stack[this.stack.length - 1] === "]") {
          this.stack.pop();
        }
      } else if (char === '"') {
        if (this.stack[this.stack.length - 1] === '"') {
          this.stack.pop();
          this.isCapturingValue = false;
        } else {
          this.stack.push('"');
          this.isCapturingValue = true;
        }
      } 
      // else if (char === ':' && !this.isCapturingValue) {
      //   if (this.stack[this.stack.length - 1] === '"') {
      //     this.stack.pop();
      //   }
      // }
      rebuffer += char;
      previousChar = char ?? previousChar;
      index++;
    }
    this.lastPosition = index;
    this.buffer = rebuffer;
  }

  getObject(): PartialJSONObject | PartialJSONObject[] {
    try {
      const clonedStack = [...this.stack];
      let clonedBuffer = this.buffer;
      while (clonedStack.length > 0) {
        clonedBuffer += clonedStack.pop();
      }
      if (clonedBuffer.startsWith("[") && !clonedBuffer.trim().endsWith("]")) {
        clonedBuffer += "]";
      }
      this.objectBuffer = JSON.parse(clonedBuffer) as PartialJSONObject;
      return this.objectBuffer;
    } catch (e) {
      return this.objectBuffer;
    }
  }

  reset(): void {
    this.buffer = '';
    this.objectBuffer = {};
    this.currentKey = null;
    this.stack = [];
  }
}

export default StreamingJsonParser;