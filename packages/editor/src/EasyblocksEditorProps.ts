import {
  RequestedExternalData,
  Config,
  ContextParams,
  ExternalData,
  InlineTypeWidgetComponentProps,
  WidgetComponentProps,
} from "@swell/easyblocks-core";
import React, { ComponentType } from "react";
import { TemplatePicker } from "./TemplatePicker";

export type ExternalDataChangeHandler = (
  externalData: RequestedExternalData,
  contextParams: ContextParams
) => void;

export type EasyblocksEditorProps = {
  config: Config;
  externalData?: ExternalData;
  onExternalDataChange?: ExternalDataChangeHandler;
  components?: Record<string, React.ComponentType<any>>;
  widgets?: Record<
    string,
    | ComponentType<WidgetComponentProps<any>>
    | ComponentType<InlineTypeWidgetComponentProps<any>>
  >;
  canvasURL?: string;
  scale?: boolean;
  isCanvas?: boolean;
  pickers?: Record<string, TemplatePicker>;
  __debug?: boolean;
  rootTemplate?: string;
  rootComponent?: string;
  locale?: string;
  documentId?: string;
  readOnly?: boolean;
};
