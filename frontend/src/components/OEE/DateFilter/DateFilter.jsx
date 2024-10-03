import React from "react";
import { DateFilterContainer } from "./DateFilter.styled";
import { Button } from "../../Button/Button.styled";

const DateFilter = ({ dateFilter, setDateFilter, voltar }) => {
  return (
    <DateFilterContainer>
      <div>{voltar && voltar}</div>
      <div>
        <Button
          primary
          className={dateFilter === 1 ? "active" : ""}
          onClick={() => setDateFilter(1)}
        >
          24h
        </Button>
        <Button
          primary
          className={dateFilter === 7 ? "active" : ""}
          onClick={() => setDateFilter(7)}
        >
          7d
        </Button>
        <Button
          primary
          className={dateFilter === 30 ? "active" : ""}
          onClick={() => setDateFilter(30)}
        >
          30d
        </Button>
      </div>
    </DateFilterContainer>
  );
};

export default DateFilter;
