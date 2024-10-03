const Indicadores = require('./../Indicadores');  // Ajuste o caminho se necessário

// Função assíncrona para rodar os testes
(async () => {
  const indicadores = new Indicadores();  // Instancia a classe

  try {
    // Testar a busca de OEE de todas as máquinas
    console.log('Testando get_OEE():');
    const oeeTodasMaquinas = await indicadores.get_OEE(null,"2022-01-01 00:00:00","2022-01-02 23:59:59");
    console.log(oeeTodasMaquinas);
   
    console.log('-------------------------------------------')
   // Testar a busca de OEE maquina especifica
   console.log('Testando por Maquina get_OEE():');
   const oeeMaquina = await indicadores.get_OEE("Maquina 2","2022-01-01 00:00:00","2022-01-02 23:59:59"); //"2022-01-01 00:00:00","2022-01-02 23:59:59"
   console.log('OEE de todas as máquinas:', oeeMaquina);
   console.log('-------------------------------------------')
    // Testar a listagem de máquinas
    console.log('Testando listMachines():');
    const maquinas = await indicadores.listMachines('2022-01-01 00:00:00','2022-01-02 23:59:59');
    console.log('Máquinas:', maquinas);
    console.log('-------------------------------------------')
    // Testar a busca de OEE para um operador específico
    console.log('Testando get_Operadores():');
    const oeeOperadores = await indicadores.get_Operadores();
    console.log('OEE dos operadores:', oeeOperadores);
    console.log('-------------------------------------------')
    // Testar a busca de Disponibilidade de todas as máquinas
    console.log('Testando get_Disponibilidade():');
    const disponibilidade = await indicadores.get_Disponibilidade();
    console.log('Disponibilidade:', disponibilidade);
    console.log('-------------------------------------------')
    // Testar a busca de Performance de todas as máquinas
    console.log('Testando get_Performance():');
    const performance = await indicadores.get_Performance();
    console.log('Performance:', performance);
    console.log('-------------------------------------------')
    // Testar a busca de Qualidade de todas as máquinas
    console.log('Testando get_Qualidade():');
    const qualidade = await indicadores.get_Qualidade();
    console.log('Qualidade:', qualidade);
    console.log('-------------------------------------------')

    // Testar a busca de Operadores por dia
    console.log('Testando get_OEE_Operadores_PorDia():');
    const oeeOperadoresPorDia = await indicadores.get_OEE_Operadores_PorDia('Maquina 1', '2022-01-01 00:00:00', '2022-01-29 23:59:59');
    console.log('OEE dos operadores por dia:', oeeOperadoresPorDia);
    console.log('-------------------------------------------')
    


  } catch (error) {
    console.error('Erro ao executar os testes:', error);
  }
})();
