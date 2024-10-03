import DetailInformation from "../../Charts/CircularProgressBar/DetailInformation";
import { MainPanelContainer } from "./MainPanel.styled";

const MainPanel = ({}) => {
  const lang = "pt-BR";

  return (
    <MainPanelContainer>
      <div>
        <DetailInformation lang={lang} /> Qualidade
      </div>
      <div>
        <DetailInformation lang={lang} />
        Performance
      </div>
      <div>
        <DetailInformation lang={lang} /> Disponibilidade
      </div>
    </MainPanelContainer>
  );
};

export default MainPanel;
