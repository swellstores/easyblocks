import { EditorContextType } from "./EditorContext";
import {
  ComponentDefinitionShared,
  isNoCodeComponentOfType,
} from "@swell/easyblocks-core";

export function getAllComponentsOfType(
  type: string,
  editorContext: EditorContextType
) {
  return getAllComponentsOfTypeFromDefinitionsArray(
    type,
    editorContext.definitions.components
  );
}

function getAllComponentsOfTypeFromDefinitionsArray(
  type: string,
  definitions: ComponentDefinitionShared[]
) {
  return definitions.filter((definition) =>
    isNoCodeComponentOfType(definition, type)
  );
}
