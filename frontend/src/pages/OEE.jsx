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

    //chamada pra api

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
        performance: "55",
        disponibilidade: "80",
        geral: "95",
      },
      {
        id_maquina: 2,
        nome_maquina: "Maquina 2",
        qualidade: "10",
        performance: "45",
        disponibilidade: "98",
        geral: "45",
      },
      {
        id_maquina: 3,
        nome_maquina: "Maquina 3",
        qualidade: "99",
        performance: "52",
        disponibilidade: "33",
        geral: "56",
      },
      {
        id_maquina: 4,
        nome_maquina: "Maquina 4",
        qualidade: "23",
        performance: "58",
        disponibilidade: "93",
        geral: "99",
      },
      {
        id_maquina: 5,
        nome_maquina: "Maquina 5",
        qualidade: "21",
        performance: "34",
        disponibilidade: "69",
        geral: "3",
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
