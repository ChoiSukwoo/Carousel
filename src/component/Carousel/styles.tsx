import styled from "@emotion/styled";
import { Util } from "../../styles";

interface CarouselProps {
  pageCnt: number;
  currentIndex: number;
  transX: number;
  animate: boolean;
}

export const ItemPageSliderContainer = styled.div({
  width: "100%",
  height: "100%",
  overflow: "hidden",
});

export const ItemPageSlider = styled.div<CarouselProps>(
  Util.DragPrevent,
  {
    height: "fit-content",
    display: "flex",
    backgroundColor: "blue",
  },
  ({ pageCnt, currentIndex, transX, animate }) => ({
    width: `${100 * pageCnt}%`,
    transform: `translateX(calc(${-(currentIndex / pageCnt) * 100}% + ${transX}px))`,
    transition: `transform ${animate ? 300 : 0}ms ease-in-out 0s`,
  })
);

export const ItemPageCover = styled.div({
  width: "100%",
  height: "100%",
});
