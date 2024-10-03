// src/test/indicadores.test.js
const mysql = require('mysql2/promise');
const Indicadores = require('../indicadores');

// Mock da conexão MySQL
jest.mock('mysql2/promise');

describe('Testes da classe Indicadores', () => {
  let indicadores;
  let poolQueryMock;

  // Configurar o mock antes de cada teste
  beforeEach(() => {
    // Mock para o método query
    poolQueryMock = jest.fn();
    
    // Mock do createPool
    mysql.createPool.mockReturnValue({
      query: poolQueryMock,
    });

    // Instanciar a classe Indicadores
    indicadores = new Indicadores();
  });

  // Testar o método get_OEE (retorna OEE de todas as máquinas)
  test('Deve retornar OEE de todas as máquinas', async () => {
    // Mock do resultado da query
    const mockRows = [
      { maquina: 'Máquina 1', oee_medio: 0.76 },
      { maquina: 'Máquina 2', oee_medio: 0.80 },
    ];

    poolQueryMock.mockResolvedValue([mockRows]);

    const result = await indicadores.get_OEE();

    expect(result).toEqual(mockRows);  // Verificar se o retorno está correto
    expect(poolQueryMock).toHaveBeenCalledWith(expect.any(String));  // Verificar se a query foi chamada
  });

  // Testar o método get_OEE_Maquina (retorna OEE de uma máquina específica)
  test('Deve retornar OEE da Máquina 1', async () => {
    // Mock do resultado da query
    const mockRows = [{ maquina: 'Máquina 1', oee_medio: 0.76 }];

    poolQueryMock.mockResolvedValue([mockRows]);

    const result = await indicadores.get_OEE_Maquina('Máquina 1','2021-01-01','2021-01-31');

    expect(result).toEqual(mockRows[0]);  // Verificar se o retorno está correto
    expect(poolQueryMock).toHaveBeenCalledWith(expect.any(String), ['Máquina 1']);  // Verificar se a query foi chamada com parâmetros
  });

  // Testar o comportamento quando a máquina não for encontrada
  test('Deve retornar mensagem se a máquina não for encontrada', async () => {
    // Mock com resultado vazio
    poolQueryMock.mockResolvedValue([[]]);

    const result = await indicadores.get_OEE_Maquina('Máquina 5');

    expect(result).toEqual({ message: 'Máquina Máquina 5 não encontrada.' });
    expect(poolQueryMock).toHaveBeenCalledWith(expect.any(String), ['Máquina 5']);
  });

  // Testar o tratamento de erro ao executar uma query
// test('Deve lançar erro ao falhar na query do banco', async () => {
   //  Mock para forçar um erro
   // poolQueryMock.mockRejectedValue(new Error('Erro ao conectar'));

   // await expect(indicadores.get_OEE()).rejects.toThrow('Erro ao conectar');
  //});
});

