const mysql = require('mysql2/promise');

class Indicadores {
  constructor() {
    this.pool = mysql.createPool({
      host: 'localhost',     
      user: 'indicador_user', 
      password: '12qwaszx',   
      database: 'mes_app',    
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
      query += ` AND io.data_hora BETWEEN '${startDate} 00:00:00' AND '${endDate} 23:59:59'`;
    }
  
      query += ' GROUP BY io.id_maquina';
  
    try {
      const [rows] = await this.pool.query(query);
  
            if (rows.length === 0) {
        return null;
      }
  
      const row = rows[0]; 

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
      m.id_maquina, 
      CONCAT(ROUND(AVG(oee) * 100, 0), '%') AS OEE,
      CONCAT(ROUND(AVG(disponibilidade) * 100, 0), '%') AS Disponibilidade,
      CONCAT(ROUND(AVG(desempenho) * 100, 0), '%') AS Desempenho,
      CONCAT(ROUND(AVG(qualidade) * 100, 0), '%') AS Qualidade
      FROM indicadores_oee io
      JOIN maquinas m ON io.id_maquina = m.id_maquina
      WHERE 1=1
    `;
    if (startDate && endDate) {
      query += ` AND io.data_hora BETWEEN '${startDate} 00:00:00' AND '${endDate} 23:59:59'`;
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
    
    if (id_operador) {
      query += ` AND io.id_operador = '${id_operador}'`;
    }
  
    
    if (startDate && endDate) {
      query += ` AND io.data_hora BETWEEN '${startDate} 00:00:00' AND '${endDate} 23:59:59'`;
    }
  
    
    query += ' GROUP BY io.id_operador';
  
    try {
      const [rows] = await this.pool.query(query);
  
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
        m.nome_maquina AS maquina,
        m.id_maquina,
        o.id_operador,
        o.nome AS operador, 
        ROUND(AVG(io.oee) * 100, 2) AS OEE,
        ROUND(AVG(io.desempenho) * 100, 2) AS performance,
        ROUND(AVG(io.qualidade) * 100, 2) AS qualidade,
        ROUND(AVG(io.disponibilidade) * 100, 2) AS disponibilidade
      FROM indicadores_oee io
      JOIN operadores o ON io.id_operador = o.id_operador
      JOIN maquinas m ON io.id_maquina = m.id_maquina
      WHERE io.id_maquina = '${id_maquina}' 
        AND io.data_hora BETWEEN '${startDate} 00:00:00' AND '${endDate} 23:59:59'
      GROUP BY o.id_operador
      ORDER BY o.id_operador;
    `;

    try {
        const [rows] = await this.pool.query(query);
        
        if (rows.length === 0) {
            return {};  
        }

        
        let somaOEE = 0, somaPerformance = 0, somaQualidade = 0, somaDisponibilidade = 0;
        let count = rows.length;

       
        let result = {
            id_maquina: rows[0].id_maquina, 
            OEE_geral: "",
            performance_geral: "",
            qualidade_geral: "",
            disponibilidade_geral: "",
            operadores: []
        };

     
        rows.forEach(row => {
            
            somaOEE += row.OEE;
            somaPerformance += row.performance;
            somaQualidade += row.qualidade;
            somaDisponibilidade += row.disponibilidade;

            result.operadores.push({
                id_operador: row.id_operador,
                nome_operador: row.operador,
                OEE: `${row.OEE}%`,
                performance: `${row.performance}%`,
                qualidade: `${row.qualidade}%`,
                disponibilidade: `${row.disponibilidade}%`
            });
        });

        result.OEE_geral = `${(somaOEE / count).toFixed(2)}%`;
        result.performance_geral = `${(somaPerformance / count).toFixed(2)}%`;
        result.qualidade_geral = `${(somaQualidade / count).toFixed(2)}%`;
        result.disponibilidade_geral = `${(somaDisponibilidade / count).toFixed(2)}%`;

        return result;
    } catch (error) {
        console.error('Erro ao buscar OEE dos operadores por dia:', error);
        throw error;
    }
}

  

}

module.exports = Indicadores;
