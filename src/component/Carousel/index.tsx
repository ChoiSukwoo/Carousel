import { FC, TransitionEventHandler, useCallback, useEffect, useState } from "react";

import { ItemPageSlider, ItemPage } from "./styles";

import inRange from "../../util/inRange";
import registDragEvent from "../../util/registDragEvent";

//드래그 민감도(작을수록 예민함)
const DragSensitive = 100;

interface Props {
  itemList: JSX.Element[];
  itemPerPage: number;
  pageWidth: number;
  itemWidth: number;
}

const Carousel: FC<Props> = ({ itemList, itemPerPage, pageWidth, itemWidth }) => {
  //현재 페이지
  const [currentPage, setCurrentPage] = useState<number>(0);
  const lastPage = Math.floor((itemList.length - 1) / itemPerPage) + 1;
  //현재 Index
  const [currentIndex, setCurrentIndex] = useState<number>(1);
  const lastIndex = Math.floor((itemList.length - 1) / itemPerPage) + 2;

  const itemGap = (pageWidth - itemWidth * itemPerPage) / Math.max(itemPerPage - 1, 1);
  //애니메이션 실행중 여부

  const [studyPage, setStudyPage] = useState<JSX.Element[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [transX, setTransX] = useState(0);
  const [animate, setAnimate] = useState<boolean>(false);

  //페이지 단위로 분활
  const createPages = useCallback(
    (maxPage: number) => {
      return Array.from({ length: maxPage }, (_, pageIndex) => {
        return (
          <ItemPage key={`page_${pageIndex}`} pageWidth={pageWidth}>
            {itemList.slice(pageIndex * itemPerPage, (pageIndex + 1) * itemPerPage).map((data) => data)}
          </ItemPage>
        );
      });
    },
    [itemList, itemPerPage, pageWidth]
  );

  //순환 리스트를 위해 조절
  const adjustPages = useCallback((pages: JSX.Element[]) => {
    if (pages.length > 1) {
      return [pages[pages.length - 1], ...pages, pages[0]].map((page, index) => ({
        ...page,
        key: "page_" + index,
      }));
    }
    return pages;
  }, []);

  //드래그중 작동될 이벤트
  const dragChangeEvent = (deltaX: number, deltaY: number) => {
    setTransX(inRange(deltaX, -pageWidth, pageWidth));
    setIsDragging(true);
  };

  //드래그 종료시 실행될 이벤트
  const dragEndEvent = (deltaX: number, deltaY: number) => {
    if (deltaX < -DragSensitive) setCurrentIndex(inRange(currentIndex + 1, 0, lastIndex));
    if (deltaX > DragSensitive) setCurrentIndex(inRange(currentIndex - 1, 0, lastIndex));

    setAnimate(true);
    setTransX(0);
    setTimeout(() => {
      setIsDragging(false);
    }, 1);
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
    const tempPageList = createPages(lastPage);
    const adjustedPageList = adjustPages(tempPageList);
    setStudyPage(adjustedPageList);
  }, [adjustPages, createPages, lastPage]);

  return (
    <ItemPageSlider
      currentIndex={currentIndex}
      itemGap={itemGap}
      pageWidth={pageWidth}
      transX={transX}
      animate={animate}
      {...registDragEvent({
        onDragChange: dragChangeEvent,
        onDragEnd: dragEndEvent,
      })}
      onTransitionEnd={transitionEndEvent}
    >
      {studyPage}
    </ItemPageSlider>
  );
};

export default Carousel;
