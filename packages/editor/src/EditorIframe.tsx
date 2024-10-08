import React, { useMemo, useState, useCallback, memo } from "react";
import styled from "styled-components";
import { Colors } from "@easyblocks/design-system";

interface EditorIframeWrapperProps {
  width: number;
  height: number;
  transform: string;
  containerRef: React.RefObject<HTMLDivElement>;
  canvasURL?: string;
}

export const EditorIframe = memo(
  ({
    width,
    height,
    transform,
    containerRef,
    canvasURL,
  }: EditorIframeWrapperProps) => {
    const [, setIframeReady] = useState(false);

    const handleIframeLoaded = useCallback(() => {
      setIframeReady(true);
    }, []);

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
            src={canvasURL || window.location.href}
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
