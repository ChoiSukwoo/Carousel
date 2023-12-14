import GlobalStyleProvider from "./Provider/GlobalStyleProvider";
import Carousel from "./component/Carousel";
import Item from "./component/Item";

function App() {
  const itemList = Array.from({ length: 13 }, (_, pageIndex) => {
    return <Item key={`item_${pageIndex}`} content={pageIndex + 1} />;
  });

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <GlobalStyleProvider />
      <div style={{ width: "940px", height: "200px", overflow: "hidden" }}>
        <Carousel itemList={itemList} itemPerPage={3} pageWidth={940} itemWidth={300} />
      </div>

      {/* <div style={{ width: "940px", height: "200px", overflow: "hidden" }}>
        <Carousel itemList={itemList} itemPerPage={1} pageWidth={310} itemWidth={300} />
      </div> */}
    </div>
  );
}

export default App;
