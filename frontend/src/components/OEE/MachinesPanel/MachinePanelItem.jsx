import { useNavigate } from "react-router-dom";
import { ListItem } from "../../FlatList/ListItem.styled";
import { OperadorMetric } from "../OperatorsPanel/OperatorListItem.styled";
import { calculateColor } from "../../utils/utils";

const MachinePanelItem = ({
  id,
  machine,
  geral,
  performance,
  layout,
  disponibilidade,
  qualidade,
}) => {
  const navigate = useNavigate();

  return (
    <ListItem
      layout={layout}
      onClick={() => navigate(`/indicadores/machine/${id}`)}
    >
      <div>
        <p>{id}</p>
      </div>
      <div>
        <p>{machine}</p>
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
    </ListItem>
  );
};
export default MachinePanelItem;
