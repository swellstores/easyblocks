import {
  Config,
  FetchOutputResources,
  InlineTypeWidgetComponentProps,
  WidgetComponentProps,
} from "@swell/easyblocks-core";
import {
  ModalContext,
  GlobalModalStyles,
  Toaster,
  TooltipProvider,
} from "@easyblocks/design-system";
import isPropValid from "@emotion/is-prop-valid";
import React, { ComponentType } from "react";
import { ShouldForwardProp, StyleSheetManager } from "styled-components";
import { Editor } from "./Editor";
import { ColorTokenWidget } from "./sidebar/ColorTokenWidget";
import { GlobalStyles } from "./tinacms/styles";
import { SpaceTokenWidget } from "./sidebar/SpaceTokenWidget";
import { parseQueryParams } from "./parseQueryParams";
import { DocumentDataWidgetComponent } from "./sidebar/DocumentDataWidget";
import { ExternalDataChangeHandler } from "./EasyblocksEditorProps";
import { TemplatePicker } from "./TemplatePicker";
import { SectionPickerModal } from "./SectionPicker";
import { SearchableSmallPickerModal } from "./SearchableSmallPickerModal";

type EasyblocksParentProps = {
  config: Config;
  externalData: FetchOutputResources;
  onExternalDataChange: ExternalDataChangeHandler;
  widgets?: Record<
    string,
    | ComponentType<WidgetComponentProps<any>>
    | ComponentType<InlineTypeWidgetComponentProps<any>>
  >;
  components?: Record<string, ComponentType<any>>;
  canvasURL?: string;
  locale?: string;
  documentId?: string;
  rootComponent?: string;
  rootTemplate?: string;
  readOnly?: boolean;
  pickers?: Record<string, TemplatePicker>;
};

const shouldForwardProp: ShouldForwardProp<"web"> = (propName, target) => {
  if (typeof target === "string") {
    // For HTML elements, forward the prop if it is a valid HTML attribute
    return isPropValid(propName);
  }
  // For other elements, forward all props
  return true;
};

const builtinWidgets: EasyblocksParentProps["widgets"] = {
  color: ColorTokenWidget,
  space: SpaceTokenWidget,
  "@easyblocks/document-data": DocumentDataWidgetComponent as any,
};

const builinPickers: EasyblocksParentProps["pickers"] = {
  large: SectionPickerModal,
  compact: SearchableSmallPickerModal,
  "large-3": SectionPickerModal,
};

export function EasyblocksParent(props: EasyblocksParentProps) {
  const editorSearchParams = parseQueryParams();

  return (
    <StyleSheetManager
      shouldForwardProp={shouldForwardProp}
      enableVendorPrefixes
    >
      <ModalContext.Provider
        value={() => {
          return document.querySelector("#modalContainer");
        }}
      >
        <GlobalStyles />
        <GlobalModalStyles />
        <TooltipProvider>
          <div
            id={"modalContainer"}
            style={{ position: "fixed", left: 0, top: 0, zIndex: 100000 }}
          />
          <Editor
            config={props.config}
            locale={props.locale || editorSearchParams.locale || undefined}
            readOnly={props.readOnly ?? editorSearchParams.readOnly ?? true}
            documentId={props.documentId ?? editorSearchParams.documentId}
            rootComponentId={
              props.rootComponent ?? editorSearchParams.rootComponentId ?? null
            }
            rootTemplateId={
              props.rootTemplate ?? editorSearchParams.rootTemplateId
            }
            externalData={props.externalData}
            onExternalDataChange={props.onExternalDataChange}
            widgets={{
              ...builtinWidgets,
              ...props.widgets,
            }}
            components={props.components}
            canvasURL={props.canvasURL}
            pickers={{
              ...builinPickers,
              ...props.pickers,
            }}
          />
        </TooltipProvider>
        <Toaster containerStyle={{ zIndex: 100100 }} />
      </ModalContext.Provider>
    </StyleSheetManager>
  );
}
