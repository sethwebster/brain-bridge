import React from "react";
import { twMerge as twm } from "tailwind-merge";
import Button, { type ButtonProps } from "./Button";
type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

type ThreeStateButtonClassNames = Record<string, string>;

type ThreeStateButtonProps<S extends ThreeStateButtonClassNames> =
  ButtonProps & {
    disabled?: undefined;
    state: keyof S;
    classNamesForStates: ThreeStateButtonClassNames;
    className?: undefined;
  };

type ThreeStateButtonPropsWithoutClassNames<
  S extends ThreeStateButtonClassNames
> = Optional<ThreeStateButtonProps<S>, "classNamesForStates">;

export default function ThreeStateButton<S extends ThreeStateButtonClassNames>(
  props: ThreeStateButtonProps<S>
) {
  const { classNamesForStates, state } = props;
  const combinedClassNameWithDarkStyles = twm(
    (classNamesForStates as { [k: string]: string })[state as string]
  );
  const newProps = {
    ...(props as Optional<
      ThreeStateButtonPropsWithoutClassNames<S>,
      "classNamesForStates"
    >),
  } as ThreeStateButtonPropsWithoutClassNames<S>;
  delete newProps.classNamesForStates;
  return (
    <Button
      {...(newProps as ThreeStateButtonProps<S>)}
      className={combinedClassNameWithDarkStyles}
      disabled={state === "disabled"}
    />
  );
}
