import React, { useState } from "react";
import SearchField from "../../Form/SearchField/SearchField";
import MachinePanelItem from "./MachinePanelItem";
import { List, MachinesPanelContainer } from "./MachinesPanel.styled";
import {
  handleSort,
  sortedOperators,
  filteredMachines,
  renderSortIcon,
} from "../../utils/utils";

const MachinesPanel = ({ machines }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const sortedMachines = sortedOperators(machines, sortColumn, sortDirection);
  const filteredMachinesList = filteredMachines(sortedMachines, searchQuery);

  return (
    <MachinesPanelContainer>
      <div>
        <h2>Máquinas</h2>
        <SearchField
          placeholder="Pesquisar..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <ul>
        <li>
          <h3
            onClick={() =>
              handleSort(
                "id_maquina",
                sortColumn,
                setSortColumn,
                sortDirection,
                setSortDirection
              )
            }
          >
            ID {renderSortIcon("id_maquina", sortColumn, sortDirection)}
          </h3>
          <h3
            onClick={() =>
              handleSort(
                "nome_maquina",
                sortColumn,
                setSortColumn,
                sortDirection,
                setSortDirection
              )
            }
          >
            Máquina {renderSortIcon("nome_maquina", sortColumn, sortDirection)}
          </h3>
          <h3
            onClick={() =>
              handleSort(
                "geral",
                sortColumn,
                setSortColumn,
                sortDirection,
                setSortDirection
              )
            }
          >
            Geral {renderSortIcon("geral", sortColumn, sortDirection)}
          </h3>
          <h3
            onClick={() =>
              handleSort(
                "disponibilidade",
                sortColumn,
                setSortColumn,
                sortDirection,
                setSortDirection
              )
            }
          >
            Disponibilidade{" "}
            {renderSortIcon("disponibilidade", sortColumn, sortDirection)}
          </h3>
          <h3
            onClick={() =>
              handleSort(
                "performance",
                sortColumn,
                setSortColumn,
                sortDirection,
                setSortDirection
              )
            }
          >
            Performance{" "}
            {renderSortIcon("performance", sortColumn, sortDirection)}
          </h3>
          <h3
            onClick={() =>
              handleSort(
                "qualidade",
                sortColumn,
                setSortColumn,
                sortDirection,
                setSortDirection
              )
            }
          >
            Qualidade {renderSortIcon("qualidade", sortColumn, sortDirection)}
          </h3>
        </li>
      </ul>
      {filteredMachinesList.map((e, i) => (
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
