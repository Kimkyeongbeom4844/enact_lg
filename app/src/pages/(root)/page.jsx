import React from "react";
import Spottable from "@enact/spotlight/Spottable";
import spotlight from "@enact/spotlight";
import { useNavigate } from "react-router-dom";
import styles from "./page.module.css";
import { DefaultContainer } from "../../components/containers/DefaultContainer";
import { FocusDefaultContainer } from "../../components/containers/FocusDefaultContainer";

const Button = Spottable("button");

const sampleButtonList = Array.from({ length: 10 }, (_, index) => index + 1);

const MainPanel = () => {
  const navigate = useNavigate();

  return (
    <>
      <DefaultContainer spotlightId="init">
        {sampleButtonList.map((item) => (
          <Button
            className={styles.button}
            onClick={() => {
              navigate("/detail");
            }}
            onSpotlightRight={(event) => {
              if (item === 10) {
                event.stopPropagation();
                // spotlight.focus("con2");
              }
            }}
          >
            {item}
          </Button>
        ))}
      </DefaultContainer>
      <FocusDefaultContainer>
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
      </FocusDefaultContainer>
    </>
  );
};

export default MainPanel;
