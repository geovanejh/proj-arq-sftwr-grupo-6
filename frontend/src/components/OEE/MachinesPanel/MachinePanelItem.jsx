import { ListItem } from "../../FlatList/ListItem.styled";
import { fixDecimals } from "../../utils/utils";

const MachinePanelItem = ({
  id,
  machine,
  geral,
  performance,
  layout,
  disponibilidade,
  qualidade,
}) => {
  return (
    <ListItem layout={layout}>
      <div>
        <p>{id}</p>
      </div>
      <div>
        <p>{machine}</p>
      </div>
      <div>
        <p>{fixDecimals(geral * 100, 2)}%</p>
      </div>
      <div>
        <p>{fixDecimals(disponibilidade * 100, 2)}%</p>
      </div>
      <div>
        <p>{fixDecimals(performance * 100, 2)}%</p>
      </div>
      <div>
        <p>{fixDecimals(qualidade * 100, 2)}%</p>
      </div>
    </ListItem>
  );
};
export default MachinePanelItem;
