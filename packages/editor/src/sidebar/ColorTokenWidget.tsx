import type { TokenTypeWidgetComponentProps } from "@swell/easyblocks-core";
import { Input } from "@easyblocks/design-system";
import React, { useState } from "react";
import { validateColor } from "./validate-color";

function ColorTokenWidget(props: TokenTypeWidgetComponentProps<string>) {
  const [inputValue, setInputValue] = useState(props.value);

  return (
    <Input
      value={inputValue}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
      }}
      onBlur={() => {
        if (validateColor(inputValue)) {
          props.onChange(inputValue);
          return;
        }

        if (validateColor("#" + inputValue)) {
          props.onChange("#" + inputValue);
          return;
        }

        props.onChange(props.value);
      }}
      align={"right"}
    />
  );
}

export { ColorTokenWidget };
