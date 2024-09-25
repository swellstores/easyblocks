import React, { useMemo, memo } from "react";
import { Fonts } from "@easyblocks/design-system";
import { dotNotationGet } from "@easyblocks/utils";
import styled from "styled-components";

import type { CompiledComponentConfig } from "@easyblocks/core";

import { buildTinaFields } from "./buildTinaFields";
import { useEditorContext } from "./EditorContext";
import { InlineSettings } from "./inline-settings";
import { mergeCommonFields } from "./tinacms/form-builder/utils/mergeCommonFields";
import { Form } from "./form";

interface EditorSidebarProps {
  focussedField: string[];
  form: Form;
}

const Error = styled.div`
  ${Fonts.body}
  padding: 7px 6px 7px;
  color: hsl(0deg 0% 50% / 0.8);
  white-space: normal;
  background: hsl(0deg 100% 50% / 0.2);
  margin-right: 10px;
  border-radius: 2px;
  margin: 16px;
`;

export const EditorSidebar = memo((props: EditorSidebarProps) => {
  const { focussedField, form } = props;
  const editorContext = useEditorContext();

  const error = useMemo(() => {
    if (focussedField.length === 1) {
      const path = focussedField[0];
      const compiledComponent: CompiledComponentConfig = dotNotationGet(
        editorContext.compiledComponentConfig,
        path
      );
      const editableComponent = dotNotationGet(form.values, path);
      if (compiledComponent?._component === "@easyblocks/missing-component") {
        return `Can’t find definition for component: ${editableComponent._component} in your project. Please contact your developers to resolve this issue.`;
      }
    }

    return "";
  }, [editorContext.compiledComponentConfig, focussedField, form.values]);

  const mergedFields = useMemo(() => {
    const areMultipleFieldsSelected = focussedField.length > 1;
    const focusedFields = focussedField.length === 0 ? [""] : focussedField;
    const fieldsPerFocusedField = focusedFields.map((focusedField) => {
      return buildTinaFields(focusedField, editorContext);
    });

    return areMultipleFieldsSelected
      ? mergeCommonFields({
          fields: fieldsPerFocusedField,
        })
      : fieldsPerFocusedField.flat();
  }, [editorContext, focussedField]);

  return (
    <>
      {error && <Error>{error}</Error>}
      <InlineSettings fields={mergedFields} />
    </>
  );
});
