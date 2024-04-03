import { FC, PropsWithChildren, TransitionEventHandler, useCallback, useEffect, useRef, useState } from "react";

import { ItemPageCover, ItemPageSlider, ItemPageSliderContainer, ItemPageSliderShield } from "./styles";

import inRange from "../../util/inRange";
import registDragEvent from "../../util/registDragEvent";
import React from "react";

//최소 해당 수치 이상 움질일시 슬라이드됨
const DragSensitive = 100;
const DragEventSensitive = 10;

interface Props {
  onPageChange?: (currentPage: number) => void;
}

const Carousel: FC<PropsWithChildren<Props>> = ({ onPageChange, children }) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  //현재 페이지
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [currentIndex, setCurrentIndex] = useState<number>(1);
  //애니메이션 실행중 여부
  const [isDragging, setIsDragging] = useState(false);
  const [transX, setTransX] = useState(0);
  const [animate, setAnimate] = useState<boolean>(false);
  //children 분리
  const childArray = React.Children.toArray(children);
  const rerrangedChildren = [
    childArray[childArray.length - 1], // 마지막 요소를 처음으로
    ...childArray, // 원본 배열
    childArray[0], // 첫 번째 요소를 마지막으로
  ];
  const lastIndex = rerrangedChildren.length - 1;
  const pageCnt = rerrangedChildren.length;

  //드래그중 작동될 이벤트
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dragChangeEvent = (deltaX: number, _deltaY: number) => {
    if (!carouselRef.current) return;
    const width = carouselRef.current.offsetWidth / pageCnt;
    setTransX(inRange(deltaX, -width, width));
    if (Math.abs(deltaX) > DragEventSensitive) {
      setIsDragging(true);
    }
  };

  //드래그 종료시 실행될 이벤트
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dragEndEvent = (deltaX: number, _deltaY: number) => {
    if (deltaX < -DragSensitive) setCurrentIndex(inRange(currentIndex + 1, 0, lastIndex));
    if (deltaX > DragSensitive) setCurrentIndex(inRange(currentIndex - 1, 0, lastIndex));

    setAnimate(true);
    setTransX(0);
    setTimeout(() => setIsDragging(false), 1);
  };

  const transitionEndEvent = useCallback<TransitionEventHandler>(() => {
    setAnimate(false);
    if (currentIndex === 0) {
      setCurrentIndex(lastIndex - 1);
    } else if (currentIndex === lastIndex) {
      setCurrentIndex(1);
    }
  }, [currentIndex, lastIndex, setAnimate, setCurrentIndex]);

  //CurrentIndex에 따라 Page변경
  useEffect(() => {
    if (currentIndex === 0) {
      setCurrentPage(lastIndex - 2);
    } else if (currentIndex === lastIndex) {
      setCurrentPage(0);
    } else {
      setCurrentPage(currentIndex - 1);
    }
  }, [currentIndex, lastIndex, setCurrentPage]);

  useEffect(() => {
    if (onPageChange) {
      onPageChange(currentPage);
    }
  }, [currentPage, onPageChange]);

  return (
    <ItemPageSliderContainer>
      <ItemPageSlider
        ref={carouselRef}
        pageCnt={pageCnt}
        currentIndex={currentIndex}
        transX={transX}
        animate={animate}
        onTransitionEnd={transitionEndEvent}
        {...registDragEvent({
          onDragChange: dragChangeEvent,
          onDragEnd: dragEndEvent,
        })}
      >
        {rerrangedChildren.map((page, index) => (
          <ItemPageCover key={index}>{page}</ItemPageCover>
        ))}
      </ItemPageSlider>
      {isDragging && <ItemPageSliderShield />}
    </ItemPageSliderContainer>
  );
};

export default Carousel;
