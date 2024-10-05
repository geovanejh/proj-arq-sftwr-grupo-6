import React from "react";
import { DateFilterContainer } from "./DateFilter.styled";
import { Button } from "../../Button/Button.styled";

const DateFilter = ({ value, onChange, voltar }) => {
  return (
    <DateFilterContainer>
      <div>{voltar && voltar}</div>

      <div>
        <Button
          primary
          className={value === 1 ? "active" : ""}
          onClick={() => onChange(1)}
        >
          24h
        </Button>
        <Button
          primary
          className={value === 7 ? "active" : ""}
          onClick={() => onChange(7)}
        >
          7d
        </Button>
        <Button
          primary
          className={value === 30 ? "active" : ""}
          onClick={() => onChange(30)}
        >
          30d
        </Button>
      </div>
    </DateFilterContainer>
  );
};

export default DateFilter;
