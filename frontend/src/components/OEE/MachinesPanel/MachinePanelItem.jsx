import { useNavigate } from "react-router-dom";
import { ListItem } from "../../FlatList/ListItem.styled";

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
        <p>{geral}%</p>
      </div>
      <div>
        <p>{disponibilidade}%</p>
      </div>
      <div>
        <p>{performance}%</p>
      </div>
      <div>
        <p>{qualidade}%</p>
      </div>
    </ListItem>
  );
};
export default MachinePanelItem;
