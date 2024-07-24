import React from "react";
import { InlineTypeWidgetComponentProps } from "@swell/easyblocks-core";
import { useEffect, useState } from "react";
import { Input } from "@easyblocks/design-system";

export function DebugUrlWidget(props: InlineTypeWidgetComponentProps<string>) {
  const [active, setActive] = useState(false);
  const [value, setValue] = useState(props.value);

  useEffect(() => {
    if (!active) {
      setValue(props.value);
    }
  });

  return (
    <Input
      value={value}
      onChange={(event) => {
        setActive(true);
        setValue(event.target.value);
      }}
      onBlur={() => {
        setActive(false);
        props.onChange(value);
      }}
      align={"right"}
    />
  );
}
