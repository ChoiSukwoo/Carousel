import GlobalStyleProvider from "./Provider/GlobalStyleProvider";
import Carousel from "./component/Carousel";
import Item from "./component/Page";

function App() {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <GlobalStyleProvider />
      <div style={{ width: "300px", height: "200px" }}>
        <Carousel>
          <div
            style={{ width: "100%", height: "100px", display: "flex", justifyContent: "center", alignItems: "center" }}
          >
            <div style={{ width: "50px", height: "50px", backgroundColor: "yellow" }}>1페이지</div>
          </div>
          <Item content={2} />
          <Item content={3} />
          <Item content={4} />
          <Item content={5} />
        </Carousel>
      </div>
    </div>
  );
}

export default App;
