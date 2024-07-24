import { NoCodeComponentDefinition } from "@swell/easyblocks-core";
import { createButtonDefinition } from "../../../createButtonDefinition";

const headerLinkDefinition: NoCodeComponentDefinition = createButtonDefinition({
  id: "HeaderLink",
  schema: [
    {
      prop: "label",
      name: "Label",
      type: "text",
    },
  ],
  editing() {
    return {
      components: {},
    };
  },
});

export { headerLinkDefinition };
