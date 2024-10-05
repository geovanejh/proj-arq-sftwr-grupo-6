import React, { useEffect, useState } from "react";
import { PageContainer } from "../components/PageContent/PageContainer.styled";
import PageHeader from "../components/PageContent/PageHeader/PageHeader";
import { useNavigate, useParams } from "react-router-dom";
import { MainContent } from "../components/PageContent/MainContent";
import MainPanel from "../components/OEE/MainPanel/MainPanel";
import OperatorsPanel from "../components/OEE/OperatorsPanel/OperatorsPanel";
import DateFilter from "../components/OEE/DateFilter/DateFilter";
import { Button } from "../components/Button/Button.styled";
import Loading from "../components/Loading/Loading";
import { api } from "../api";
import toast from "react-hot-toast";
import { subDays, format } from "date-fns";

const OEEMachine = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [oeeData, setOeeData] = useState();
  const [dateFilter, setDateFilter] = useState(1);
  const [loading, setLoading] = useState(true);

  const setup = async () => {
    setLoading(true);

    const firstDate = format(subDays(new Date(), dateFilter), "yyyy-MM-dd");
    const endDate = format(new Date(), "yyyy-MM-dd");

    try {
      const { data } = await api.get(
        `/indicadores/operadores_maquina/${id}/${firstDate}/${endDate}`
      );

      const newArr = {
        id_maquina: data.id_maquina,
        qualidade: data.qualidade_geral,
        performance: data.performance_geral,
        disponibilidade: data.disponibilidade_geral,
        geral: data.OEE_geral,
        operadores: data.operadores.map((e, i) => {
          return {
            id_operador: e.id_operador,
            qualidade: e.qualidade,
            performance: e.performance,
            disponibilidade: e.disponibilidade,
            nome_operador: e.nome_operador,
            geral: e.OEE,
          };
        }),
      };

      setOeeData(newArr);

      toast.success("Sucesso ao buscar dados.");
    } catch (error) {
      console.log(error);
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
      <PageHeader title={`Indicadores OEE - Máquina ${id}`} />
      <MainContent>
        <DateFilter
          value={dateFilter}
          onChange={setDateFilter}
          voltar={
            <Button primary onClick={() => navigate(-1)}>
              Voltar
            </Button>
          }
        />
        {oeeData && <MainPanel oeeData={oeeData} />}
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
