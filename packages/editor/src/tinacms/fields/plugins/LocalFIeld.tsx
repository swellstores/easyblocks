import React from "react";
import { FieldRenderProps } from "react-final-form";
import { InternalField } from "@swell/easyblocks-core/_internals";
import { LocalValue } from "@swell/easyblocks-core";

import { useEditorContext } from "../../../EditorContext";

import { MissingWidget } from "./MissingWidget";
import { wrapFieldsWithMeta } from "./wrapFieldWithMeta";

export const LocalFieldPlugin = {
  name: "local",
  Component: wrapFieldsWithMeta(function LocalField({
    field,
    input,
  }: FieldRenderProps<LocalValue<unknown>> & {
    field: InternalField;
  }) {
    const { types } = useEditorContext();
    const typeDefinition = types[field.schemaProp.type];

    const onChange = React.useCallback(
      (value: unknown) => {
        input.onChange({
          value,
          widgetId: input.value.widgetId,
        });
      },
      [input]
    );

    if (typeDefinition.type !== "inline") {
      return <MissingWidget type={field.schemaProp.type} />;
    }

    const WidgetComponent = typeDefinition?.widget.component;

    if (!WidgetComponent) {
      return <MissingWidget type={field.schemaProp.type} />;
    }

    return (
      <WidgetComponent
        field={field}
        value={input.value.value}
        params={
          "params" in field.schemaProp ? field.schemaProp.params : undefined
        }
        onChange={onChange}
      />
    );
  }),
};
