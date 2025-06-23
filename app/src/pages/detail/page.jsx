import React, { useRef, useState, useEffect } from "react";
import Spottable from "@enact/spotlight/Spottable";
import styles from "./page.module.css";
import { useNavigate } from "react-router-dom";
import { FocusDefaultContainer } from "../../components/containers/FocusDefaultContainer";
import { DefaultContainer } from "../../components/containers/DefaultContainer";
import duckFamily from "../../assets/videos/landscape.mp4";
import LS2Request from "@enact/webos/LS2Request";

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

  const handleSkip = (event, seconds) => {
    event.stopPropagation();
    if (videoRef.current) {
      videoRef.current.currentTime += seconds;
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const progress =
        (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(progress);

      // 비디오 재생 상태 확인
      const isVideoPlaying = !videoRef.current.paused;

      setIsPlaying(isVideoPlaying);
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
    <div onClick={togglePlay} className={styles.videoContainer}>
      <video
        ref={videoRef}
        src={duckFamily}
        className={styles.video}
        autoPlay
        muted={false}
        loop
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      />
      <div className={styles.controls}>
        <div className={styles.timelineContainer}>
          <span className={styles.timeInfo}>
            {formatTime(videoRef.current?.currentTime || 0)}
          </span>
          <div
            className={styles.timeline}
            onClick={(event) => {
              event.stopPropagation();
              handleSeek(event);
            }}
          >
            <div
              className={styles.timelineProgress}
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className={styles.timeInfo}>{formatTime(duration)}</span>
        </div>
        <FocusDefaultContainer className={styles.buttonGroup}>
          <Button
            className={styles.skipButton}
            onClick={(event) => handleSkip(event, -10)}
          >
            ⟲ 10초
          </Button>
          <Button
            className={styles.playButton}
            onClick={(event) => {
              event.stopPropagation();
              togglePlay();
            }}
          >
            {isPlaying ? "∥" : "▶"}
          </Button>
          <Button
            className={styles.skipButton}
            onClick={(event) => handleSkip(event, 10)}
          >
            10초 ⟳
          </Button>
        </FocusDefaultContainer>
      </div>
    </div>
  );
};

const DetailPanel = () => {
  const navigate = useNavigate();

  const [audioResult, setAudioResult] = useState(false);

  useEffect(() => {
    const ls2Request = new LS2Request();
    ls2Request.send({
      service: "luna://com.webos.audio",
      method: "setMuted",
      parameters: { muted: false },
      onSuccess: function (inResponse) {
        console.log("TV is muted");
        setAudioResult(true);
        // To-Do something
      },
      onFailure: function (inError) {
        console.log("Failed to set muted");
        console.log("[" + inError.errorCode + "]: " + inError.errorText);
        setAudioResult(false);
        // To-Do something
        return;
      },
    });
    // var request = webOS.service.request("luna://com.webos.audio", {
    //   method: "setMuted",
    //   parameters: { muted: true },
    //   onSuccess: function (inResponse) {
    //     console.log("TV is muted");
    //     // To-Do something
    //   },
    //   onFailure: function (inError) {
    //     console.log("Failed to set muted");
    //     console.log("[" + inError.errorCode + "]: " + inError.errorText);
    //     // To-Do something
    //     return;
    //   },
    // });
  }, []);

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
        <p className="text-danger">
          {audioResult ? "TV is muted" : "TV is not muted"}
        </p>
      </DefaultContainer>
      <CustomVideoPlayer />
    </div>
  );
};

export default DetailPanel;
