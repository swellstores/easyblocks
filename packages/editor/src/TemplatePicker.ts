import { ComponentDefinitionShared, Template } from "@swell/easyblocks-core";

export type TemplatesDictionary = {
  [componentId: string]: {
    component: ComponentDefinitionShared;
    templates: Template[];
  };
};

type TemplatePickerProps = {
  isOpen: boolean;
  path: string;
  templates?: TemplatesDictionary;
  onClose: (template?: Template) => void;
  mode?: string;
  domRect?: DOMRect;
};

export type TemplatePicker<T = Record<never, never>> = React.FC<
  TemplatePickerProps & T
>;
