import styled from "@emotion/styled";

interface CarouselProps {
  currentIndex: number;
  itemGap: number;
  pageWidth: number;
  transX: number;
  animate: boolean;
}

type CarouselPageProps = Pick<CarouselProps, "pageWidth">;

export const ItemPageSlider = styled.div<CarouselProps>(
  {
    width: "100%",
    height: "fit-content",
    display: "flex",
  },
  ({ currentIndex, itemGap, pageWidth, transX, animate }) => ({
    columnGap: itemGap,
    transform: `translateX(${-currentIndex * (pageWidth + itemGap) + transX}px)`,
    transition: `transform ${animate ? 300 : 0}ms ease-in-out 0s`,
  })
);

export const ItemPage = styled.div<CarouselPageProps>(
  {
    boxSizing: "border-box",
    flexShrink: 0,
    display: "flex",
    justifyContent: "space-between",
  },
  ({ pageWidth }) => ({
    width: `${pageWidth}px`,
  })
);
