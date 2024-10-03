import DetailInformation from "../../Charts/CircularProgressBar/DetailInformation";
import { MainPanelContainer } from "./MainPanel.styled";

const MainPanel = ({ oee }) => {
  const lang = "pt-BR";

  return (
    <MainPanelContainer>
      <div>
        <DetailInformation score={oee.geral} /> Geral
      </div>
      <div>
        <DetailInformation score={oee.qualidade} /> Qualidade
      </div>
      <div>
        <DetailInformation score={oee.performance} />
        Performance
      </div>
      <div>
        <DetailInformation score={oee.disponibilidade} /> Disponibilidade
      </div>
    </MainPanelContainer>
  );
};

export default MainPanel;
