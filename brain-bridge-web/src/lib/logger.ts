
type LogLevel = "none" | "info" | "debug" | "warn" | "error";

const LEVEL_MAP = {
  "none": 0,
  "info": 1,
  "debug": 2,
  "warn": 3,
  "error": 4
}

const LOG_LEVEL: LogLevel = ((process.env.LOG_LEVEL ?? process.env.NEXT_PUBLIC_LOG_LEVEL) as LogLevel) || "info";

function shouldLog(level: LogLevel) {
  return LEVEL_MAP[level] >= LEVEL_MAP[LOG_LEVEL];
}

const Logger = {
  log: () => {
    throw new Error("DO NOT USE .log(), use `info`, `warn`, or `error` instead")
  },
  info: (...args: unknown[]) => {
    if (LOG_LEVEL === "none") return;
    if (shouldLog("info")) console.info(...args)
  },
  debug: (...args: unknown[]) => {
    if (LOG_LEVEL === "none") return;
    if (shouldLog("debug")) console.debug(...args)
  },
  warn: (...args: unknown[]) => {
    if (LOG_LEVEL === "none") return;
    if (shouldLog("warn")) console.warn(...args)
  },
  error: (...args: unknown[]) => {
    if (LOG_LEVEL === "none") return;
    if (shouldLog("error")) console.error(...args)
    console.error(...args)
  },
  table: (...args: unknown[]) => {
    if (LOG_LEVEL === "none") return;
    if (shouldLog("debug")) console.table(...args);
  },
  group: (...args: unknown[]) => {
    if (LOG_LEVEL === "none") return;
    console.group(...args)
  },
  logWhen: (condition: boolean, level: LogLevel, ...args: unknown[]) => {
    if (LOG_LEVEL === "none") return;
    if (condition) {
      const c = console as {
        log: (...args: unknown[]) => void;
        info: (...args: unknown[]) => void;
        debug: (...args: unknown[]) => void;
        warn: (...args: unknown[]) => void;
      } as { [key: string]: (...args: unknown[]) => void; }



      const fn = c[level] as (...args: unknown[]) => void;
      if (shouldLog(level)) fn(...args);
    }
  }
}

export default Logger;