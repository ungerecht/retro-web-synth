import { memo } from "react";
import RadioButton from "./RadioButton";

import { RadioButtonGroupProps } from "../types";

const RadioButtonGroup = ({
  items,
  id,
  comparator,
  buttonWidth,
  buttonHeight,
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
            width={buttonWidth}
            height={buttonHeight}
            onValueChange={onValueChange}
          />
        );
      })}
    </>
  );
};

export default memo(RadioButtonGroup);
