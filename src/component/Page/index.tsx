import { FC } from "react";
import { ItemStyle } from "./styles";

interface Props {
  content: number;
}

const Item: FC<Props> = ({ content }) => {
  return <ItemStyle>{content}</ItemStyle>;
};

export default Item;
