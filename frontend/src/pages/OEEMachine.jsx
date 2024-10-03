import React, { useEffect, useState } from "react";
import { PageContainer } from "../components/PageContent/PageContainer.styled";
import PageHeader from "../components/PageContent/PageHeader/PageHeader";
import { useNavigate, useParams } from "react-router-dom";
import { MainContent } from "../components/PageContent/MainContent";
import MainPanel from "../components/OEE/MainPanel/MainPanel";
import OperatorsPanel from "../components/OEE/OperatorsPanel/OperatorsPanel";
import DateFilter from "../components/OEE/DateFilter/DateFilter";
import { Button } from "../components/Button/Button.styled";

const OEEMachine = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [oeeData, setOeeData] = useState();
  const [dateFilter, setDateFilter] = useState(1);

  const setup = async () => {
    console.log("rodou setup");
    //fetch máquina aqui
    setOeeData({
      id_maquina: 1,
      geral: "10",
      performance: "12",
      qualidade: "77",
      disponibilidade: "44",
      operadores: [
        {
          nome_operador: "João",
          id_operador: 1,
          geral: "10",
          performance: "12",
          qualidade: "77",
          disponibilidade: "74",
        },
        {
          nome_operador: "Marcos",
          id_operador: 2,
          geral: "10",
          performance: "12",
          qualidade: "74",
          disponibilidade: "98",
        },
      ],
    });
  };

  useEffect(() => {
    setup();
  }, [dateFilter]);

  return (
    <PageContainer>
      <PageHeader title={`Indicadores OEE - Máquina ${id}`} />
      <MainContent>
        <DateFilter
          setDateFilter={setDateFilter}
          dateFilter={dateFilter}
          voltar={
            <Button primary onClick={() => navigate(-1)}>
              Voltar
            </Button>
          }
        />
        {oeeData && <MainPanel oee={oeeData} />}
        {oeeData && (
          <OperatorsPanel
            operators={oeeData.operadores}
            maquina={oeeData.id_maquina}
          />
        )}
      </MainContent>
    </PageContainer>
  );
};

export default OEEMachine;
