import { NoCodeComponentDefinition } from "@swell/easyblocks-core";

const triggerEventDefinition: NoCodeComponentDefinition = {
  id: "TriggerEvent",
  label: "Trigger Event",
  type: "action",
  schema: [
    {
      prop: "message",
      type: "text",
    },
  ],
};

export { triggerEventDefinition };
