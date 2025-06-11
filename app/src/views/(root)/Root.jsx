import kind from "@enact/core/kind";
import SpotlightContainerDecorator from "@enact/spotlight/SpotlightContainerDecorator";
import Spottable from "@enact/spotlight/Spottable";
import spotlight from "@enact/spotlight";
import { useDispatch, useSelector } from "react-redux";
import { setPath } from "../../store/reducers/path";
import styles from "./Root.module.css";
import { useNavigate } from "react-router-dom";

const Container = SpotlightContainerDecorator("div");
const Button = Spottable("button");

const sampleButtonList = Array.from({ length: 10 }, (_, index) => index + 1);

const MainPanel = (props) => {
  const dispatch = useDispatch();
  const path = useSelector((state) => state.path.path);
  const navigate = useNavigate();

  return (
    <>
      <Container spotlightId="con1">
        {sampleButtonList.map((item) => (
          <Button
            className={styles.button}
            onClick={() => {
              console.log(item);
              dispatch(setPath("detail"));
              navigate("/detail");
            }}
            onSpotlightRight={(event) => {
              if (item === 10) {
                event.stopPropagation();
                spotlight.focus("con2");
              }
            }}
          >
            {item}
          </Button>
        ))}
      </Container>
      <Container spotlightId="con2">
        {sampleButtonList.map((item) => (
          <Button
            className={styles.button}
            onClick={() => {
              // window.alert("123");
              // alert(1111);
            }}
            spotlightId={`btn-${item}`}
          >
            {item}
          </Button>
        ))}
      </Container>
    </>
  );
};

export default MainPanel;

// import React from "react";

// const Root = () => {
//   return <div>Root</div>;
// };

// export default Root;
