import React from "react";
import Spottable from "@enact/spotlight/Spottable";
import { useNavigate } from "react-router-dom";
import styles from "./page.module.css";
import { DefaultContainer } from "../../components/containers/DefaultContainer";
import { FocusDefaultContainer } from "../../components/containers/FocusDefaultContainer";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

const Button = Spottable("button");

const sampleButtonList = Array.from({ length: 10 }, (_, index) => index + 1);

const MainPanel = () => {
  const navigate = useNavigate();
  const deviceStore = useSelector((state) => state.device);

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
      <div
        style={{
          color: "green",
        }}
      >
        {deviceStore.width}x{deviceStore.height}
      </div>
      <div className="text-danger">{deviceStore.orientation}</div>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
        onTouchEnd={(swiper) => {
          console.log(swiper);
          // 모든 슬라이드의 배경색을 빨간색으로 변경
          const slides = swiper.slides;
          slides.forEach((slide) => {
            slide.style.backgroundColor = "red";
          });
        }}
      >
        {Array.from({ length: 10 }, (_, index) => (
          <SwiperSlide
            onTouchStart={(event) => {
              event.target.style.backgroundColor = "blue";
            }}
            style={{ backgroundColor: "red", height: "500px" }}
          >
            Slide {index + 1}
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default MainPanel;
