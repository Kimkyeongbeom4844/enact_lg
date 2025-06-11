import React from "react";
import SpotlightContainerDecorator from "@enact/spotlight/SpotlightContainerDecorator";
import { useDispatch } from "react-redux";
import { setPath } from "../../store/reducers/path";
import Spottable from "@enact/spotlight/Spottable";
import styles from "./Detail.module.css";
import { useNavigate } from "react-router-dom";
const Container = SpotlightContainerDecorator("div");
const Button = Spottable("button");

const DetailPanel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Container>
      <Button
        className={styles.button}
        onClick={() => {
          dispatch(setPath("main"));
          navigate("/");
        }}
      >
        Detail
      </Button>
    </Container>
  );
};

export default DetailPanel;
