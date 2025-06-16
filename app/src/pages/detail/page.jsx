import React, { useRef, useState } from "react";
import Spottable from "@enact/spotlight/Spottable";
import styles from "./page.module.css";
import { useNavigate } from "react-router-dom";
import { FocusDefaultContainer } from "../../components/containers/FocusDefaultContainer";
import { DefaultContainer } from "../../components/containers/DefaultContainer";
import landscape from "../../assets/videos/landscape.mp4";

const Button = Spottable("button");

const CustomVideoPlayer = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const togglePlay = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleSkip = (seconds) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds;
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const progress =
        (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(progress);
    }
  };

  const handleLoadedMetadata = () => {
    setDuration(videoRef.current.duration);
  };

  const handleSeek = (e) => {
    const timeline = e.currentTarget;
    const rect = timeline.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = (x / rect.width) * 100;
    const time = (percent / 100) * duration;
    videoRef.current.currentTime = time;
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className={styles.videoContainer}>
      <video
        ref={videoRef}
        src={landscape}
        className={styles.video}
        autoPlay
        muted
        loop
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      />
      <div className={styles.controls}>
        <div className={styles.timelineContainer}>
          <span className={styles.timeInfo}>
            {formatTime(videoRef.current?.currentTime || 0)}
          </span>
          <div className={styles.timeline} onClick={handleSeek}>
            <div
              className={styles.timelineProgress}
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className={styles.timeInfo}>{formatTime(duration)}</span>
        </div>
        <FocusDefaultContainer className={styles.buttonGroup}>
          <Button className={styles.skipButton} onClick={() => handleSkip(-10)}>
            ⟲ 10초
          </Button>
          <Button className={styles.playButton} onClick={togglePlay}>
            {isPlaying ? "∥" : "▶"}
          </Button>
          <Button className={styles.skipButton} onClick={() => handleSkip(10)}>
            10초 ⟳
          </Button>
        </FocusDefaultContainer>
      </div>
    </div>
  );
};

const DetailPanel = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <DefaultContainer className={styles.header}>
        <Button
          className={styles.backButton}
          onClick={() => {
            navigate("/");
          }}
        >
          ← 뒤로가기
        </Button>
      </DefaultContainer>
      <CustomVideoPlayer />
    </div>
  );
};

export default DetailPanel;
