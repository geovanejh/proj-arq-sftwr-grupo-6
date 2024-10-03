import React, { useEffect, useState } from "react";
import ReviewsBar from "./ReviewsBar";

const DetailInformation = (props) => {
  // extract language from props
  const lang = props.lang;
  // use state for variables coming from an api
  const [rank, setRank] = useState("");
  const [year, setYear] = useState("");
  const [inventor, setInventor] = useState("");
  const [reviewScore, setReviewScore] = useState(76);

  return (
    <>
      <div className="col-md-2" style={{ width: 200, height: 200 }}>
        <ReviewsBar score={reviewScore} />
      </div>
    </>
  );
};

export default DetailInformation;
