const mysql = require('mysql2/promise');

class Indicadores {
  constructor() {
    this.pool = mysql.createPool({
      host: 'localhost',     // Altere para o host do seu banco de dados
      user: 'indicador_user', // Nome do usuário
      password: '12qwaszx',   // Senha do usuário
      database: 'mes_app',    // Nome do banco de dados
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });
  }

  async get_OEE(id_maquina = null, startDate = null, endDate = null) {
    let query = `
      SELECT 
        io.id_maquina,
        CONCAT(ROUND(AVG(io.qualidade) * 100, 0), '%') AS qualidade,
        CONCAT(ROUND(AVG(io.desempenho) * 100, 0), '%') AS performance,
        CONCAT(ROUND(AVG(io.disponibilidade) * 100, 0), '%') AS disponibilidade,
        CONCAT(ROUND(AVG(io.oee) * 100, 0), '%') AS geral
      FROM indicadores_oee io
      WHERE 1=1
    `;
  
    if (id_maquina) {
      query += ` AND io.id_maquina = '${id_maquina}'`;
    }
    if (startDate && endDate) {
      query += ` AND io.data_hora BETWEEN '${startDate}' AND '${endDate}'`;
    }
  
    // Adicionar GROUP BY para resolver o problema de agregação
    query += ' GROUP BY io.id_maquina';
  
    try {
      const [rows] = await this.pool.query(query);
  
      // Garantir que o resultado contenha algo e esteja na estrutura correta
      if (rows.length === 0) {
        return null;
      }
  
      const row = rows[0]; // Pegando a primeira linha (já que agrupamos por máquina)
      
      if (id_maquina)
      return {
        id_maquina: row.id_maquina,
        qualidade: row.qualidade,
        performance: row.performance,
        disponibilidade: row.disponibilidade,
        geral: row.geral
      };
      else  
      return {
        qualidade: row.qualidade,
        performance: row.performance,
        disponibilidade: row.disponibilidade,
        geral: row.geral  
      };
    } catch (error) {
      console.error('Erro ao buscar OEE:', error);
      throw error;
    }
  }
  

  async listMachines(startDate = null, endDate = null) {
    let query = `
      SELECT 
      m.nome_maquina, 
      CONCAT(ROUND(AVG(oee) * 100, 0), '%') AS OEE,
      CONCAT(ROUND(AVG(disponibilidade) * 100, 0), '%') AS Disponibilidade,
      CONCAT(ROUND(AVG(desempenho) * 100, 0), '%') AS Desempenho,
      CONCAT(ROUND(AVG(qualidade) * 100, 0), '%') AS Qualidade
      FROM indicadores_oee io
      JOIN maquinas m ON io.id_maquina = m.id_maquina
      WHERE 1=1
    `;
    if (startDate && endDate) {
      query += ` AND io.data_hora BETWEEN '${startDate}' AND '${endDate}'`;
    }
    query += `
      GROUP BY io.id_maquina
      ORDER BY io.id_maquina ASC
    `;
  
    try {
      const [rows] = await this.pool.query(query);
      return rows;
    } catch (error) {
      console.error('Erro ao listar máquinas:', error);
      throw error;
    }
  }
  
  
  async get_Operadores(id_operador = null, startDate = null, endDate = null) {
    let query = `
      SELECT 
        o.id_operador,
        o.nome AS operador,
        CONCAT(ROUND(AVG(io.oee) * 100, 0), '%') AS geral,
        CONCAT(ROUND(AVG(io.desempenho) * 100, 0), '%') AS performance,
        CONCAT(ROUND(AVG(io.qualidade) * 100, 0), '%') AS qualidade,
        CONCAT(ROUND(AVG(io.disponibilidade) * 100, 0), '%') AS disponibilidade
      FROM indicadores_oee io
      JOIN operadores o ON io.id_operador = o.id_operador
      WHERE 1=1
    `;
    
    // Adicionando filtros se o operador for especificado
    if (id_operador) {
      query += ` AND io.id_operador = '${id_operador}'`;
    }
  
    // Adicionando filtros de data, se forem fornecidos
    if (startDate && endDate) {
      query += ` AND io.data_hora BETWEEN '${startDate}' AND '${endDate}'`;
    }
  
    // Agrupando pelo operador
    query += ' GROUP BY io.id_operador';
  
    try {
      const [rows] = await this.pool.query(query);
  
      // Mapeando a estrutura de retorno conforme solicitado
      return rows.map(row => ({
        id_operador: row.id_operador,
        geral: row.geral,
        performance: row.performance,
        qualidade: row.qualidade,
        disponibilidade: row.disponibilidade
      }));
  
    } catch (error) {
      console.error('Erro ao buscar OEE dos operadores:', error);
      throw error;
    }
  }
  

  async get_OEE_Operadores_PorDia(id_maquina, startDate, endDate) {
    let query = `
      SELECT 
        o.nome AS operador, 
        DATE(io.data_hora) AS data,
        CONCAT(ROUND(AVG(io.oee) * 100, 2), '%') AS OEE
      FROM indicadores_oee io
      JOIN operadores o ON io.id_operador = o.id_operador
      WHERE io.id_maquina = '${id_maquina}' 
        AND io.data_hora BETWEEN '${startDate}' AND '${endDate}'
      GROUP BY io.id_operador, data
      ORDER BY data, io.id_operador;
    `;
    
    try {
      const [rows] = await this.pool.query(query);
      let result = {};
    
      rows.forEach(row => {
        const { operador, data, OEE } = row;
        if (!result[data]) {
          result[data] = {};
        }
        result[data][operador] = OEE;
      });
    
      return result;
    } catch (error) {
      console.error('Erro ao buscar OEE dos operadores por dia:', error);
      throw error;
    }
  }

  

}

module.exports = Indicadores;
