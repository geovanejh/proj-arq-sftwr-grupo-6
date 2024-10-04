const Indicadores = require('./../Indicadores');  // Ajuste o caminho se necessário

// Função assíncrona para rodar os testes
(async () => {
  const indicadores = new Indicadores();  // Instancia a classe

  try {
    // Testar a busca de OEE de todas as máquinas
    console.log('Testando get_OEE():');
    const oeeTodasMaquinas = await indicadores.get_OEE(null,"2024-01-01 00:00:00","2024-01-02 23:59:59");
    console.log(oeeTodasMaquinas);
    console.log('-------------------------------------------')

   // Testar a busca de OEE maquina especifica
   console.log('Testando por Maquina get_OEE():');
   const oeeMaquina = await indicadores.get_OEE("1","2024-01-01 00:00:00","2024-03-02 23:59:59"); 
   console.log('OEE da máquina:', oeeMaquina);
   console.log('-------------------------------------------')
   
     // Testar a listagem de máquinas
   console.log('Testando listMachines():');
   const maquinas = await indicadores.listMachines('2024-01-01 00:00:00','2024-06-02 23:59:59');
   console.log('Máquinas:', maquinas);
    console.log('-------------------------------------------')
   
    // Testar a busca de OEE para um operador específico
    console.log('Testando get_Operadores():');
    const oeeOperadores = await indicadores.get_Operadores();
    console.log('OEE dos operadores:', oeeOperadores);
    console.log('-------------------------------------------')

    // Testar a busca de Operadores por dia
    console.log('Testando get_OEE_Operadores_PorDia():');
    const oeeOperadoresPorDia = await indicadores.get_OEE_Operadores_PorDia('1', '2024-01-01 00:00:00', '2024-01-10 23:59:59');
    console.log('OEE dos operadores por dia:', oeeOperadoresPorDia);
    console.log('-------------------------------------------')



  } catch (error) {
    console.error('Erro ao executar os testes:', error);
  }
})();
