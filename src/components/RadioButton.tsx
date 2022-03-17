import { Fragment, memo } from "react";
import { RadioButtonProps } from "../types";
import * as Icons from "../icons";
import "../styles/Button.css";

const RadioButton = ({
  value,
  name,
  selected,
  height,
  width,
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
      {icon ? (
        <label
          className="radio-icon"
          htmlFor={`${name}${value}`}
          style={{ width: width, height: height }}
          data-testid={value + "label"}
        >
          {icon}
        </label>
      ) : (
        <label
          className="radio-icon"
          htmlFor={`${name}${value}`}
          style={{ width: width, height: height }}
          data-testid={value + "label"}
        >
          {value}
        </label>
      )}
    </Fragment>
  );
};

export default memo(RadioButton);
