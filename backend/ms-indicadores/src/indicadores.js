const mysql = require('mysql2/promise');

class Indicadores {
  constructor() {
    this.pool = mysql.createPool({
      host: 'localhost',     // Altere para o host do seu banco de dados
      user: 'root', // Nome do usuário
      password: 'root',   // Senha do usuário
      database: 'mes_app',    // Nome do banco de dados
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });
  }

  async get_OEE(maquina = null, startDate = null, endDate = null) {
    let query = `
      SELECT ${maquina ? 'maquina, ' : ''}CONCAT(ROUND(AVG(oee) * 100, 0), '%') AS OEE 
      FROM indicadores_oee 
      WHERE 1=1
    `;
    if (maquina) {
      query += ` AND maquina = '${maquina}'`;
    }
    if (startDate && endDate) {
      query += ` AND data_hora BETWEEN '${startDate}' AND '${endDate}'`;
    }
    if (maquina) {
      query += ' GROUP BY maquina';
    }

    try {
      const [rows] = await this.pool.query(query);
      return rows;
    } catch (error) {
      console.error('Erro ao buscar OEE:', error);
      throw error;
    }
  }

  async listMachines(startDate = null, endDate = null) {
    let query = `
      SELECT 
      maquina, 
      CONCAT(ROUND(AVG(oee) * 100, 0), '%') AS OEE,
      CONCAT(ROUND(AVG(disponibilidade) * 100, 0), '%') AS Disponibilidade,
      CONCAT(ROUND(AVG(desempenho) * 100, 0), '%') AS Desempenho,
      CONCAT(ROUND(AVG(qualidade) * 100, 0), '%') AS Qualidade
      FROM indicadores_oee 
      WHERE 1=1
    `;
    if (startDate && endDate) {
      query += ` AND data_hora BETWEEN '${startDate}' AND '${endDate}'`;
    }
    query += `
      GROUP BY maquina
      ORDER BY maquina ASC
    `;
  
    try {
      const [rows] = await this.pool.query(query);
      return rows;
    } catch (error) {
      console.error('Erro ao listar máquinas:', error);
      throw error;
    }
  }
  

  async get_Disponibilidade(maquina = null, startDate = null, endDate = null) {
    let query = `
      SELECT ${maquina ? 'maquina, ' : ''}CONCAT(ROUND(AVG(disponibilidade) * 100, 0), '%') AS disponibilidade_medio 
      FROM indicadores_oee 
      WHERE 1=1
    `;
    if (maquina) {
      query += ` AND maquina = '${maquina}'`;
    }
    if (startDate && endDate) {
      query += ` AND data BETWEEN '${startDate}' AND '${endDate}'`;
    }
    if (maquina) {
      query += ' GROUP BY maquina';
    }

    try {
      const [rows] = await this.pool.query(query);
      return rows;
    } catch (error) {
      console.error('Erro ao buscar Disponibilidade:', error);
      throw error;
    }
  }

  async get_Performance(maquina = null, startDate = null, endDate = null) {
    let query = `
      SELECT ${maquina ? 'maquina, ' : ''}CONCAT(ROUND(AVG(desempenho) * 100, 0), '%') AS performance_medio 
      FROM indicadores_oee 
      WHERE 1=1
    `;
    if (maquina) {
      query += ` AND maquina = '${maquina}'`;
    }
    if (startDate && endDate) {
      query += ` AND data BETWEEN '${startDate}' AND '${endDate}'`;
    }
    if (maquina) {
      query += ' GROUP BY maquina';
    }

    try {
      const [rows] = await this.pool.query(query);
      return rows;
    } catch (error) {
      console.error('Erro ao buscar Performance:', error);
      throw error;
    }
  }

  async get_Qualidade(maquina = null, startDate = null, endDate = null) {
    let query = `
      SELECT ${maquina ? 'maquina, ' : ''}CONCAT(ROUND(AVG(qualidade) * 100, 0), '%') AS qualidade_medio 
      FROM indicadores_oee 
      WHERE 1=1
    `;
    if (maquina) {
      query += ` AND maquina = '${maquina}'`;
    }
    if (startDate && endDate) {
      query += ` AND data BETWEEN '${startDate}' AND '${endDate}'`;
    }
    if (maquina) {
      query += ' GROUP BY maquina';
    }

    try {
      const [rows] = await this.pool.query(query);
      return rows;
    } catch (error) {
      console.error('Erro ao buscar Qualidade:', error);
      throw error;
    }
  }

  async get_OEE_Operadores_PorDia(maquina, startDate, endDate) {
    let query = `
      SELECT 
        operador, 
        DATE(data_hora) AS data,
        CONCAT(ROUND(AVG(oee) * 100, 2), '%') AS OEE
      FROM indicadores_oee 
      WHERE maquina = '${maquina}' 
        AND data_hora BETWEEN '${startDate}' AND '${endDate}'
      GROUP BY operador, data
      ORDER BY data, operador;
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
  

  async get_Operadores(operador = null, startDate = null, endDate = null) {
    let query = `
      SELECT ${operador ? 'operador, ' : ''}CONCAT(ROUND(AVG(oee) * 100, 0), '%') AS OEE_operadores 
      FROM indicadores_oee 
      WHERE 1=1
    `;
    if (operador) {
      query += ` AND operador = '${operador}'`;
    }
    if (startDate && endDate) {
      query += ` AND data BETWEEN '${startDate}' AND '${endDate}'`;
    }
    if (operador) {
      query += ' GROUP BY operador';
    }

    try {
      const [rows] = await this.pool.query(query);
      return rows;
    } catch (error) {
      console.error('Erro ao buscar OEE dos operadores:', error);
      throw error;
    }
  }
}

module.exports = Indicadores;
