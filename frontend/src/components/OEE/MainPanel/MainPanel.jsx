import React from "react";
import DetailInformation from "../../Charts/CircularProgressBar/DetailInformation";
import { MainPanelContainer } from "./MainPanel.styled";
import { removePercentage, getIntegerPart } from "../../../utils/utils";

const MainPanel = ({ oeeData }) => {
  if (!oeeData) {
    return <div>Loading...</div>;
  }

  return (
    <MainPanelContainer>
      <div>
        <DetailInformation
          score={getIntegerPart(removePercentage(oeeData.geral))}
        />
        OEE
      </div>
      <div>
        <DetailInformation
          score={getIntegerPart(removePercentage(oeeData.disponibilidade))}
        />
        Disponibilidade
      </div>
      <div>
        <DetailInformation
          score={getIntegerPart(removePercentage(oeeData.performance))}
        />
        Performance
      </div>
      <div>
        <DetailInformation
          score={getIntegerPart(removePercentage(oeeData.qualidade))}
        />
        Qualidade
      </div>
    </MainPanelContainer>
  );
};

export default MainPanel;
