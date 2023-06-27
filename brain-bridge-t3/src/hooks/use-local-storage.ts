import { useState } from "react";
import Logger from "~/lib/logger";


function useLocalStorage<T>(key: string, initialValue: T) {
  const [state, setState] = useState<T>(() => {
    // Initialize the state
    try {
      const value = window.localStorage.getItem(key)
      // Check if the local storage already has any values,
      // otherwise initialize it with the passed initialValue
      return (value ? JSON.parse(value) : initialValue) as T;
    } catch (error) {
      Logger.error(error)
      return null as T;
    }
  })

  const setValue = (value: T) => {
    try {
      // If the passed value is a callback function,
      //  then call it with the existing state.
      const valueToStore = (value instanceof Function ? value(state) : value) as T;
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
      setState(value)
    } catch (error) {
      Logger.error("FAILED TO SET LOCAL STORAGE VALUE", key, error)
    }
  }

  return [state, setValue] as [T, (value: T) => void]
}

export default useLocalStorage;