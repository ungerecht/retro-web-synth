import React from "react";
import * as Icons from "../icons";
import "../styles/Button.css";

interface ButtonProps {
  value: string;
  name: string;
  selected: boolean;
  height: number;
  width: number;
  onValueChange: (event: any) => void;
}

const Button = ({
  value,
  name,
  selected,
  height,
  width,
  onValueChange,
}: ButtonProps) => {
  const icon = Icons[value as keyof typeof Icons];
  return (
    <React.Fragment>
      <input
        type="radio"
        name={name}
        value={value}
        id={`${name}${value}`}
        checked={selected}
        onChange={onValueChange}
        className="radio-button"
      />
      {icon ? (
        <label
          className="radio-icon"
          htmlFor={`${name}${value}`}
          style={{ width: width, height: height }}
        >
          {icon}
        </label>
      ) : (
        <label
          className="radio-icon unselectable"
          htmlFor={`${name}${value}`}
          style={{ width: width, height: height }}
        >
          {value}
        </label>
      )}
    </React.Fragment>
  );
};

export default Button;
