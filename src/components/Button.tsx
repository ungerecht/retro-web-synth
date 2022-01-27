import React from "react";
import * as Icons from "../icons";
import "../styles/Button.css";

interface ButtonProps {
  value: string;
  selected: string;
  onValueChange: (event: any) => void;
}

const Button = ({ value, selected, onValueChange }: ButtonProps) => {
  const icon = Icons[value as keyof typeof Icons];
  return (
    <React.Fragment>
      <input
        type="radio"
        value={value}
        id={value}
        checked={value === selected}
        onChange={onValueChange}
        className="radio-button"
      />
      {icon ? (
        <label className="radio-icon" htmlFor={value}>
          {icon}
        </label>
      ) : (
        <label className="radio-icon unselectable" htmlFor={value}>
          {value}
        </label>
      )}
    </React.Fragment>
  );
};

export default Button;
