import React from "react";
import RadioButton from "./RadioButton";

interface RadioButtonGroupProps {
  items: string[];
  id: string;
  comparator: string;
  buttonWidth: number;
  buttonHeight: number;
  onValueChange: (e: any) => void;
}

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

export default React.memo(RadioButtonGroup);
