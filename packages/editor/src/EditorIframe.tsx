import React, { useMemo, useState, useCallback, memo } from "react";
import styled from "styled-components";
import { Colors } from "@easyblocks/design-system";
import { ExtraKeys, useWindowKeyDown } from "./useWindowKeyDown";

interface EditorIframeWrapperProps {
  onEditorHistoryRedo: () => void;
  onEditorHistoryUndo: () => void;
  width: number;
  height: number;
  transform: string;
  containerRef: React.RefObject<HTMLDivElement>;
}

export const EditorIframe = memo(
  ({
    onEditorHistoryRedo,
    onEditorHistoryUndo,
    width,
    height,
    transform,
    containerRef,
  }: EditorIframeWrapperProps) => {
    const [isIframeReady, setIframeReady] = useState(false);

    const handleIframeLoaded = useCallback(() => {
      setIframeReady(true);
    }, []);

    useWindowKeyDown("z", onEditorHistoryUndo, {
      extraKeys: [ExtraKeys.META_KEY],
      isDisabled: !isIframeReady,
    });

    useWindowKeyDown("z", onEditorHistoryRedo, {
      extraKeys: [ExtraKeys.META_KEY, ExtraKeys.SHIFT_KEY],
      isDisabled: !isIframeReady,
    });

    useWindowKeyDown("z", onEditorHistoryUndo, {
      extraKeys: [ExtraKeys.CTRL_KEY],
      isDisabled: !isIframeReady,
    });

    useWindowKeyDown("y", onEditorHistoryRedo, {
      extraKeys: [ExtraKeys.CTRL_KEY],
      isDisabled: !isIframeReady,
    });

    const style = useMemo(() => {
      // These properties will change a lot during resizing, so we don't pass it to styled component to prevent
      // class name recalculations
      return {
        width,
        height,
        transform,
      };
    }, [width, height, transform]);

    return (
      <IframeContainer ref={containerRef}>
        <IframeInnerContainer>
          <Iframe
            id="shopstory-canvas"
            src={window.location.href}
            onLoad={handleIframeLoaded}
            style={style}
          />
        </IframeInnerContainer>
      </IframeContainer>
    );
  }
);

const IframeContainer = styled.div`
  position: relative;
  flex: 1 1 auto;
  background: ${Colors.black100};
`;

const IframeInnerContainer = styled.div`
  position: absolute; // absolute to prevent grid container having effect on parent div width (div can be oversized)
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: grid;
  justify-content: center;
  align-items: center;
`;

const Iframe = styled.iframe`
  background: white;
  border: none;
  transform-origin: center;
`;
