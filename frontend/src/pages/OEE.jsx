import React, { useEffect, useState } from "react";
import { PageContainer } from "../components/PageContent/PageContainer.styled";
import PageHeader from "../components/PageContent/PageHeader/PageHeader";
import MainPanel from "../components/OEE/MainPanel/MainPanel";
import { MainContent } from "../components/PageContent/MainContent";
import MachinesPanel from "../components/OEE/MachinesPanel/MachinesPanel";
import DateFilter from "../components/OEE/DateFilter/DateFilter";

const OEE = () => {
  const [machinesData, setMachinesData] = useState();
  const [oeeData, setOeeData] = useState();
  const [dateFilter, setDateFilter] = useState(1);

  const setup = async () => {
    //fetch maquinas aqui
    setOeeData({
      qualidade: "67",
      performance: "53",
      disponibilidade: "76",
      geral: "8",
    });

    setMachinesData([
      {
        id_maquina: 1,
        nome_maquina: "Maquina 1",
        qualidade: "10",
        performance: "5",
        disponibilidade: "10",
        geral: "15",
      },
      {
        id_maquina: 2,
        nome_maquina: "Maquina 2",
        qualidade: "10",
        performance: "5",
        disponibilidade: "10",
        geral: "15",
      },
      {
        id_maquina: 3,
        nome_maquina: "Maquina 3",
        qualidade: "10",
        performance: "5",
        disponibilidade: "10",
        geral: "15",
      },
    ]);
    // try {
    //   //const { data } = await api.get(`/indicadores/separados/maquinas`);

    //   if (data.erro) {
    //     //toast.error("CEP não encontrado.");
    //   } else {
    //     console.log(data);
    //   }
    // } catch (error) {
    //   console.log(error);
    //   //toast.error("Erro ao buscar CEP.");
    // }
  };

  useEffect(() => {
    setup();
  }, []);

  return (
    <PageContainer>
      <PageHeader title="Indicadores OEE" />
      <MainContent>
        <DateFilter setDateFilter={setDateFilter} dateFilter={dateFilter} />
        {oeeData && <MainPanel oee={oeeData} />}
        {machinesData && <MachinesPanel machines={machinesData} />}
      </MainContent>
    </PageContainer>
  );
};

export default OEE;
