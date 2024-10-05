import React, { useState } from "react";
import SearchField from "../../Form/SearchField/SearchField";
import { OperatorsPanelContainer } from "./OperatorListItem.styled";
import OperatorsPanelItem from "./OperatorsPanelItem";
import {
  handleSort,
  sortedOperators,
  filteredOperators,
  renderSortIcon,
} from "../../../utils/utils";

const OperatorsPanel = ({ operators, maquina }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const sortedOps = sortedOperators(operators, sortColumn, sortDirection);
  const filteredOps = filteredOperators(sortedOps, searchQuery);

  return (
    <OperatorsPanelContainer>
      <div>
        <h2>Operadores da máquina {maquina} no período selecionado</h2>
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
                "nome_operador",
                sortColumn,
                setSortColumn,
                sortDirection,
                setSortDirection
              )
            }
          >
            Operador
            {renderSortIcon("nome_operador", sortColumn, sortDirection)}
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
            OEE {renderSortIcon("geral", sortColumn, sortDirection)}
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
            Disponibilidade
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
            Performance
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
      {filteredOps.map((e, i) => (
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
