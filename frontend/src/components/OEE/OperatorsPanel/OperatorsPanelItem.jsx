import {
  calculateColor,
  removePercentage,
  getIntegerPart,
} from "../../../utils/utils";
import { OperadorMetric, OperatorListItem } from "./OperatorListItem.styled";

const OperatorsPanelItem = ({
  id,
  nome,
  geral,
  performance,
  qualidade,
  disponibilidade,
}) => {
  console.log("O QUE CHEGOU: ");
  console.log(nome);
  console.log(geral);
  console.log(performance);
  console.log(qualidade);
  console.log(disponibilidade);
  return (
    <OperatorListItem>
      <div>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOSIZ6hZseAPKb42yOVWSqt00bWSi8yusbMQ&s"></img>
        <div>
          <p>{nome}</p>
          <span>Operador de máquinas</span>
        </div>
      </div>
      <div>
        <OperadorMetric
          style={{
            backgroundColor: removePercentage(
              calculateColor(geral.slice(0, 2))
            ),
          }}
        >
          {getIntegerPart(geral)}%
        </OperadorMetric>
      </div>
      <div>
        <OperadorMetric
          style={{
            backgroundColor: calculateColor(disponibilidade.slice(0, 2)),
          }}
        >
          {getIntegerPart(disponibilidade)}%
        </OperadorMetric>
      </div>
      <div>
        <OperadorMetric
          style={{ backgroundColor: calculateColor(performance.slice(0, 2)) }}
        >
          {getIntegerPart(performance)}%
        </OperadorMetric>
      </div>
      <div>
        <OperadorMetric
          style={{ backgroundColor: calculateColor(qualidade.slice(0, 2)) }}
        >
          {getIntegerPart(qualidade)}%
        </OperadorMetric>
      </div>
    </OperatorListItem>
  );
};

export default OperatorsPanelItem;
