import { CSSObject } from "@emotion/react";

export const Util = {
  DragPrevent: {
    msUser: "none",
    MozUserDrag: "none",
    KhtmlUserDrag: "none",
    WebkitUserDrag: "none",
    userSelect: "none",
    msUserSelect: "none",
    MozUserSelect: "none",
    KhtmlUserSelect: "none",
    WebkitUserSelect: "none",
  } as CSSObject,
  LineCutting: (props: { line: number }): CSSObject => ({
    display: "-webkit-box",
    wordWrap: "break-word",
    WebkitLineClamp: props.line,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
  }),
  ButtonStyleRemove: {
    backgroundColor: "transparent",
    color: "inherit",
    border: "none",
    padding: 0,
    cursor: "pointer",
    outline: "inherit",
  },

  ContentWidth: {
    flexShrink: 0,
    minWidth: "1140px",
    "&>*": {
      maxWidth: "1140px",
      width: "100%",
    },
  },
  FlexCenter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};
