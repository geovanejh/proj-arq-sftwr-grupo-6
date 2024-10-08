import React from "react";
import ReviewsProvider from "./ReviewsProvider";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const ReviewsBar = (props) => {
  const { score } = props;

  const calcColor = (percent, start, end) => {
    let a = percent / 100,
      b = (end - start) * a,
      c = b + start;

    return "hsl(" + c + ", 100%, 50%)";
  };

  return (
    <ReviewsProvider valueStart={0} valueEnd={score}>
      {(value) => (
        <CircularProgressbar
          value={value}
          text={`${value} %`}
          circleRatio={0.7}
          styles={{
            trail: {
              strokeLinecap: "butt",
              transform: "rotate(-126deg)",
              transformOrigin: "center center",
            },
            path: {
              strokeLinecap: "butt",
              transform: "rotate(-126deg)",
              transformOrigin: "center center",
              stroke: calcColor(value, 0, 120),
            },
            text: {
              fill: "#ddd",
            },
          }}
          strokeWidth={10}
        />
      )}
    </ReviewsProvider>
  );
};

export default ReviewsBar;
