"use client";
import "./Button.scss";
import { MouseEventHandler } from "react";

type Params = {
  classes?: string;
  label: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
};
function Button({ classes = "", onClick, label }: Params) {
  return (
    <button className={`Button ${classes}`} type="button" onClick={onClick}>
      {label}
    </button>
  );
}
export { Button };
