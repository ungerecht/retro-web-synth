import { Fragment, memo } from "react";
import { RadioButtonProps } from "../types";
import * as Icons from "../icons";
import "../styles/RadioButton.css";

const RadioButton = ({
  value,
  name,
  selected,
  size,
  onValueChange,
}: RadioButtonProps) => {
  const icon = Icons[value as keyof typeof Icons];
  return (
    <Fragment>
      <input
        type="radio"
        name={name}
        value={value}
        id={`${name}${value}`}
        checked={selected}
        onChange={onValueChange}
        className="radio-button"
      />
      <label
        className={`radio-icon ${size} unselectable`}
        htmlFor={`${name}${value}`}
        data-testid={value + "label"}
      >
        {icon ? icon : value}
      </label>
    </Fragment>
  );
};

export default memo(RadioButton);
