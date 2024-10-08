import React from "react";
import styled, { css } from "styled-components";
import { IconButton } from "../tinacms/styles";
import {
  AFTER_ADD_BUTTON_DISPLAY,
  AFTER_ADD_BUTTON_LEFT,
  AFTER_ADD_BUTTON_TOP,
  BEFORE_ADD_BUTTON_DISPLAY,
  BEFORE_ADD_BUTTON_LEFT,
  BEFORE_ADD_BUTTON_TOP,
} from "./cssVariables";

export { ICON_BUTTON_SIZE as ADD_BUTTON_SIZE } from "../tinacms/styles";

interface AddButtonProps {
  position: "before" | "after";
  index?: number;
  offset?: number | { x: number; y: number };
  onClick?: (domRect: DOMRect) => void;
}

export const AddButton = React.memo(
  ({ position, index, offset, onClick }: AddButtonProps): JSX.Element => {
    const [isOpen, setIsOpen] = React.useState(false);
    const addBlockButtonRef = React.useRef<HTMLButtonElement>(null);

    const handleOpenBlockMenu = React.useCallback<React.MouseEventHandler>(
      (event) => {
        event.stopPropagation();
        event.preventDefault();

        const domRect = addBlockButtonRef.current?.getBoundingClientRect();

        // Custom add action
        if (domRect && onClick) {
          onClick(domRect);
          return;
        }
      },
      [onClick]
    );

    React.useEffect(() => {
      function inactivateBlockMenu() {
        setIsOpen(false);
      }

      document.addEventListener("mouseup", inactivateBlockMenu, false);

      return () => {
        document.removeEventListener("mouseup", inactivateBlockMenu);
      };
    }, []);

    return (
      <AddButtonWrapper
        index={index}
        offset={offset}
        position={position}
        isOpen={isOpen}
      >
        <AddIconButton
          ref={addBlockButtonRef}
          onClick={handleOpenBlockMenu}
          isOpen={isOpen}
          primary
          small
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="23"
            height="23"
            viewBox="0 0 23 23"
            fill="none"
          >
            <line x1="11.5" y1="4" x2="11.5" y2="19" stroke="currentColor" />
            <line x1="4" y1="11.5" x2="19" y2="11.5" stroke="currentColor" />
          </svg>
        </AddIconButton>
      </AddButtonWrapper>
    );
  }
);

interface AddMenuProps {
  isOpen?: boolean;
  active?: boolean;
  openTop?: boolean;
}

const AddIconButton = styled(IconButton)<AddMenuProps>`
  display: flex;
  align-items: center;

  &:focus {
    outline: none !important;
  }

  ${(props) =>
    props.isOpen &&
    css`
      pointer-events: none;
    `};
`;

interface AddButtonWrapperProps {
  index?: number;
  offset?: number | { x: number; y: number };
  position: "before" | "after";
  isOpen: boolean;
}

const AddButtonWrapper = styled.div<AddButtonWrapperProps>`
  position: absolute;
  top: var(
    ${({ position }) =>
      position === "before" ? BEFORE_ADD_BUTTON_TOP : AFTER_ADD_BUTTON_TOP}
  );
  left: var(
    ${({ position }) =>
      position === "before" ? BEFORE_ADD_BUTTON_LEFT : AFTER_ADD_BUTTON_LEFT}
  );

  display: var(
    ${({ position }) =>
      position === "before"
        ? BEFORE_ADD_BUTTON_DISPLAY
        : AFTER_ADD_BUTTON_DISPLAY},
    none
  );
  pointer-events: all;
`;
