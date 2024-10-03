import SearchField from "../../Form/SearchField/SearchField";
import { MachinesPanelContainer } from "../MachinesPanel/MachinesPanel.styled";
import { OperatorsPanelContainer } from "./OperatorListItem.styled";
import OperatorsPanelItem from "./OperatorsPanelItem";

const OperatorsPanel = ({ operators, maquina }) => {
  return (
    <OperatorsPanelContainer>
      <div>
        <h2>Operadores da máquina {maquina}</h2>
        <SearchField placeholder="Pesquisar..." />
      </div>
      <ul>
        <li>
          <h3>Operador</h3>
          <h3>Geral</h3>
          <h3>Disponibilidade</h3>
          <h3>Performance</h3>
          <h3>Qualidade</h3>
        </li>
      </ul>
      {operators.map((e, i) => (
        <OperatorsPanelItem
          layout="1fr 1fr 1fr 1fr 1fr"
          id={e.id_operador}
          nome={e.nome_operador}
          key={e.id_operador}
          geral={e.geral}
          performance={e.performance}
          disponibilidade={e.disponibilidade}
          qualidade={e.qualidade}
        />
      ))}
    </OperatorsPanelContainer>
  );
};

export default OperatorsPanel;
