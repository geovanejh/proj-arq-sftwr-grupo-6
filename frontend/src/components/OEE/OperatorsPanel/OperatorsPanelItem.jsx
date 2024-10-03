import DetailInformation from "../../Charts/CircularProgressBar/DetailInformation";
import { OperadorMetric, OperatorListItem } from "./OperatorListItem.styled";

const OperatorsPanelItem = ({
  id,
  nome,
  geral,
  performance,
  qualidade,
  disponibilidade,
}) => {
  const calculateColor = (number) => {
    if (number >= 75) {
      return "#29cc97";
    } else if (number >= 40) {
      return "#fec400";
    } else {
      return "#f12b2c";
    }
  };

  return (
    <OperatorListItem>
      <div>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOSIZ6hZseAPKb42yOVWSqt00bWSi8yusbMQ&s"></img>
        <div>
          <p>{nome}</p>
          <span>Operator de máquinas</span>
        </div>
      </div>
      <div>
        <OperadorMetric style={{ backgroundColor: calculateColor(geral) }}>
          {geral}
        </OperadorMetric>
      </div>
      <div>
        <OperadorMetric
          style={{ backgroundColor: calculateColor(disponibilidade) }}
        >
          {disponibilidade}
        </OperadorMetric>
      </div>
      <div>
        <OperadorMetric
          style={{ backgroundColor: calculateColor(performance) }}
        >
          {performance}
        </OperadorMetric>
      </div>
      <div>
        <OperadorMetric style={{ backgroundColor: calculateColor(qualidade) }}>
          {qualidade}
        </OperadorMetric>
      </div>
    </OperatorListItem>
  );
};

export default OperatorsPanelItem;
