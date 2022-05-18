import { memo } from "react";
import RadioButton from "./RadioButton";

import { RadioButtonGroupProps } from "../types";

const RadioButtonGroup = ({
  items,
  id,
  comparator,
  buttonSize,
  onValueChange,
}: RadioButtonGroupProps) => {
  return (
    <>
      {items.map((item, i) => {
        return (
          <RadioButton
            key={`${id}${i}`}
            name={id}
            value={item}
            selected={comparator === item}
            size={buttonSize}
            onValueChange={onValueChange}
          />
        );
      })}
    </>
  );
};

export default memo(RadioButtonGroup);
