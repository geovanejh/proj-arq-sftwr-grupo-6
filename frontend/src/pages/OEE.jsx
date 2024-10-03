import React, { useEffect, useState } from "react";
import { PageContainer } from "../components/PageContent/PageContainer.styled";
import PageHeader from "../components/PageContent/PageHeader/PageHeader";
import MainPanel from "../components/OEE/MainPanel/MainPanel";
import { MainContent } from "../components/PageContent/MainContent";
import MachinesPanel from "../components/OEE/MachinesPanel/MachinesPanel";
import { api } from "../api";
import axios from "axios";

const OEE = () => {
  const [machinesData, setMachinesData] = useState();

  const setup = async () => {
    try {
      const { data } = await api.get(`/indicadores/separados/maquinas`);

      setMachinesData(data);
      if (data.erro) {
        //toast.error("CEP não encontrado.");
      } else {
        console.log(data);
      }
    } catch (error) {
      console.log(error);
      //toast.error("Erro ao buscar CEP.");
    }
  };

  useEffect(() => {
    setup();
  }, []);

  return (
    <PageContainer>
      <PageHeader title="Indicadores OEE" />
      <MainContent>
        <MainPanel />
        {machinesData && <MachinesPanel machines={machinesData} />}
      </MainContent>
    </PageContainer>
  );
};

export default OEE;
