import React, { useEffect, useState } from "react";
import { PageContainer } from "../components/PageContent/PageContainer.styled";
import PageHeader from "../components/PageContent/PageHeader/PageHeader";
import MainPanel from "../components/OEE/MainPanel/MainPanel";
import { MainContent } from "../components/PageContent/MainContent";
import MachinesPanel from "../components/OEE/MachinesPanel/MachinesPanel";
import DateFilter from "../components/OEE/DateFilter/DateFilter";
import toast from "react-hot-toast";
import { api } from "../api";
import { subDays, format } from "date-fns";
import Loading from "../components/Loading/Loading";

const OEE = () => {
  const [machinesData, setMachinesData] = useState([]);
  const [oeeData, setOeeData] = useState({});
  const [dateFilter, setDateFilter] = useState(1);
  const [loading, setLoading] = useState(true);

  const setup = async () => {
    setLoading(true);
    const firstDate = format(subDays(new Date(), dateFilter), "yyyy-MM-dd");
    const endDate = format(new Date(), "yyyy-MM-dd");

    try {
      const { data } = await api.get(
        `/indicadores/oee/${firstDate}/${endDate}`
      );

      setOeeData(data);

      const responseMachines = await api.get(
        `/indicadores/maquinas/${firstDate}/${endDate}`
      );

      console.log("machinesResponse: ", responseMachines.data);

      const newArr = responseMachines.data.map((item, index) => {
        return {
          id_maquina: item.id_maquina,
          nome_maquina: `Maquina ${item.id_maquina}`,
          qualidade: item.Qualidade,
          performance: item.Desempenho,
          disponibilidade: item.Disponibilidade,
          geral: item.OEE,
        };
      });
      setMachinesData(newArr);

      toast.success("Sucesso ao buscar dados.");
    } catch (error) {
      toast.error("Um erro aconteceu, tente novamente.", {
        style: {
          marginLeft: "255px",
        },
      });
    }

    setLoading(false);
  };

  useEffect(() => {
    setup();
  }, [dateFilter]);

  return loading ? (
    <Loading />
  ) : (
    <PageContainer>
      <PageHeader title="OEE" />
      <MainContent>
        <DateFilter value={dateFilter} onChange={setDateFilter} />
        <MainPanel oeeData={oeeData} />
        <MachinesPanel machines={machinesData} />
      </MainContent>
    </PageContainer>
  );
};

export default OEE;
