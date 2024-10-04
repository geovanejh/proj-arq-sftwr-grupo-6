import { FaSortAlphaUp, FaSortAlphaUpAlt } from "react-icons/fa";

export const fixDecimals = (number, decimals) => {
  return number.toFixed(decimals);
};

export const calculateColor = (number) => {
  if (number >= 75) {
    return "#29cc97";
  } else if (number >= 40) {
    return "#fec400";
  } else {
    return "#f12b2c";
  }
};

export const handleSort = (
  column,
  sortColumn,
  setSortColumn,
  sortDirection,
  setSortDirection
) => {
  if (sortColumn === column) {
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  } else {
    setSortColumn(column);
    setSortDirection("asc");
  }
};

export const sortedOperators = (operators, sortColumn, sortDirection) => {
  return [...operators].sort((a, b) => {
    if (!sortColumn) return 0;
    const aValue = isNaN(a[sortColumn]) ? a[sortColumn] : Number(a[sortColumn]);
    const bValue = isNaN(b[sortColumn]) ? b[sortColumn] : Number(b[sortColumn]);
    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });
};

export const filteredOperators = (operators, searchQuery) => {
  return operators.filter((operator) =>
    operator.nome_operador?.toLowerCase().includes(searchQuery.toLowerCase())
  );
};

export const filteredMachines = (machines, searchQuery) => {
  return machines.filter((machine) =>
    machine.nome_maquina?.toLowerCase().includes(searchQuery.toLowerCase())
  );
};

export const renderSortIcon = (column, sortColumn, sortDirection) => {
  if (sortColumn === column) {
    return sortDirection === "asc" ? <FaSortAlphaUp /> : <FaSortAlphaUpAlt />;
  }
  return null;
};
