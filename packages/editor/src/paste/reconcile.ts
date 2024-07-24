import { CompilationContextType } from "@swell/easyblocks-core/_internals";
import { normalize } from "@swell/easyblocks-core/_internals";
import { NoCodeComponentEntry } from "@swell/easyblocks-core";

export function reconcile({
  context,
  templateId,
  fieldName,
}: {
  context: CompilationContextType;
  templateId?: string;
  fieldName?: string;
}) {
  return (item: NoCodeComponentEntry) => {
    if (!fieldName || !templateId) {
      return item;
    }

    const contextMatches =
      item._itemProps?.[templateId]?.[fieldName] !== undefined;

    if (contextMatches) {
      return item;
    }

    return normalize(
      {
        ...item,
        _itemProps: {
          [templateId]: {
            [fieldName]: {},
          },
        },
      },
      context
    );
  };
}
