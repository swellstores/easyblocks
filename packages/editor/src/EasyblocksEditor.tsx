import React, { useEffect, useState, useMemo, memo } from "react";

import { EasyblocksEditorProps } from "./EasyblocksEditorProps";
import { EasyblocksParent } from "./EasyblocksParent";
import { EasyblocksCanvas } from "./EditorChildWindow";
import { PreviewRenderer } from "./PreviewRenderer";
import { addDebugToEditorProps } from "./debug/addDebugToEditorProps";
import { parseQueryParams } from "./parseQueryParams";
import {
  EasyblocksCanvasProvider,
  RichTextEditor,
  TextEditor,
} from "@swell/easyblocks-core/_internals";
import EditableComponentBuilder from "./EditableComponentBuilder/EditableComponentBuilder.editor";
import TypePlaceholder from "./Placeholder";

export const EasyblocksEditor = memo<EasyblocksEditorProps>((props) => {
  const [selectedWindow, setSelectedWindow] = useState<
    "parent" | "child" | "preview" | null
  >(props.isCanvas ? "child" : null);

  const setSelectedWindowToParent = () => {
    window.isShopstoryEditor = true;
    setSelectedWindow("parent");
  };

  useEffect(() => {
    if (parseQueryParams().preview) {
      setSelectedWindow("preview");
      return;
    }

    if (props.isCanvas) {
      return;
    }

    const setSelectedWindowToChild = () => {
      setSelectedWindow("child");
    };

    if (selectedWindow === null) {
      /**
       * Why try catch?
       *
       * It's because window.parent.isShopstoryEditor might throw if window.parent is cross origin (when shopstory Launcher is run in iframe of CMS - like Contentful); In that case we're sure it's a parent window, not a child.
       */
      try {
        // Parent window is always rendered first so `window.isShopstoryEditor` will always be set when <iframe /> with child is loading
        if (window.parent !== window.self && window.parent.isShopstoryEditor) {
          setSelectedWindowToChild();
        } else {
          setSelectedWindowToParent();
        }
      } catch (error) {
        setSelectedWindowToParent();
      }
    }
  }, []);

  const queryParams = useMemo(
    () => parseQueryParams(window.location.search),
    [window.location.search]
  );

  if (!selectedWindow) {
    return null;
  }

  if (queryParams.debug) {
    props = addDebugToEditorProps(props);
  }

  return (
    <>
      {selectedWindow === "parent" && (
        <EasyblocksParent
          config={props.config}
          externalData={props.externalData ?? {}}
          onExternalDataChange={props.onExternalDataChange ?? (() => ({}))}
          widgets={props.widgets}
          components={props.components}
          fullHeight={props.fullHeight}
          canvasURL={props.canvasURL}
          readOnly={props.readOnly}
          locale={props.locale}
          documentId={props.documentId}
          rootTemplate={props.rootTemplate}
          rootComponent={props.rootComponent}
          pickers={props.pickers}
        />
      )}

      {selectedWindow === "child" && (
        <EasyblocksCanvasProvider
          components={{
            ...props.components,
            "@easyblocks/rich-text.editor": RichTextEditor,
            "@easyblocks/text.editor": TextEditor,
            "EditableComponentBuilder.editor": EditableComponentBuilder,
            Placeholder: TypePlaceholder,
          }}
        >
          <EasyblocksCanvas />
        </EasyblocksCanvasProvider>
      )}

      {selectedWindow === "preview" && <PreviewRenderer {...props} />}
    </>
  );
});
