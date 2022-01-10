import { useNProgress } from "@tanem/react-nprogress";
import React from "react";

const LoadingBar = ({ isAnimating }) => {
  const { animationDuration, isFinished, progress } = useNProgress({
    isAnimating,
  });

  return (
    <div
      className="progress-bar"
      style={{
        opacity: isFinished ? 0 : 1,
        marginLeft: `${(-1 + progress) * 100}%`,
        transition: `margin-left ${animationDuration}ms linear`,
      }}
    ></div>
  );
};

export default LoadingBar;
