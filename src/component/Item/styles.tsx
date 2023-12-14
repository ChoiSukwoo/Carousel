import styled from "@emotion/styled";

export const ItemStyle = styled.div({
  msUser: "none",
  MozUserDrag: "none",
  KhtmlUserDrag: "none",
  WebkitUserDrag: "none",
  userSelect: "none",
  msUserSelect: "none",
  MozUserSelect: "none",
  KhtmlUserSelect: "none",
  WebkitUserSelect: "none",

  fontSize: "35px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  width: "300px",
  height: "200px",
  backgroundColor: "#eee",
  ":hover": {
    backgroundColor: "#ddd",
  },
  ":active": {
    backgroundColor: "#ccc",
  },
});
