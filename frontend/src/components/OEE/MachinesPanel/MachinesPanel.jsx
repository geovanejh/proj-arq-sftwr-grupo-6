import SearchField from "../../Form/SearchField/SearchField";
import MachinePanelItem from "./MachinePanelItem";
import { List, MachinesPanelContainer } from "./MachinesPanel.styled";

const MachinesPanel = ({ machines }) => {
  console.log(machines);

  return (
    <MachinesPanelContainer>
      <div>
        <h2>Máquinas</h2>
        <SearchField placeholder="Pesquisar..." />
      </div>
      <ul>
        <li>
          <h3>ID</h3>
          <h3>Máquina</h3>
          <h3>Geral</h3>
          <h3>Disponibilidade</h3>
          <h3>performance</h3>
          <h3>Qualidade</h3>
        </li>
      </ul>
      {machines.map((e, i) => (
        <MachinePanelItem
          layout="1fr 1fr 1fr 1fr 1fr 1fr"
          id={e.id_maquina}
          key={i}
          machine={e.nome_maquina}
          geral={e.geral}
          performance={e.performance}
          disponibilidade={e.disponibilidade}
          qualidade={e.qualidade}
        />
      ))}
    </MachinesPanelContainer>
  );
};

export default MachinesPanel;
