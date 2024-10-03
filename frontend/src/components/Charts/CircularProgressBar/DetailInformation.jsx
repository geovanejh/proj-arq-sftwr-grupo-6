import React, { useEffect, useState } from "react";
import ReviewsBar from "./ReviewsBar";

const DetailInformation = ({ score }) => {
  return <ReviewsBar score={score} />;
};

export default DetailInformation;
