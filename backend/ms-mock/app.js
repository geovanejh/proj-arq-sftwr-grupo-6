const express = require('express');
const mysql = require('mysql2/promise');
const moment = require('moment');

const app = express();
const port = process.env.PORT || 3001;

// Configuração da conexão com o banco de dados
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'mes_app',
};

// Função para gerar um número aleatório dentro de um intervalo
function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

// Armazenar os valores anteriores dos indicadores
let previousData = {
    disponibilidade: 0.8,
    desempenho: 0.8,
    qualidade: 0.8
};

// Função para gerar dados mockados
function generateMockData() {
    // Mapeie os IDs das máquinas e operadores
    const maquinas = [1, 2, 3, 4, 5]; // IDs das máquinas
    const operadores = [1, 2, 3, 4, 5]; // IDs dos operadores

    const data_hora = moment().format('YYYY-MM-DD HH:mm:ss');
    const id_maquina = maquinas[Math.floor(Math.random() * maquinas.length)];
    const id_operador = operadores[Math.floor(Math.random() * operadores.length)];
    const tempo_planejado_producao = 200; // Tempo planejado
    const tempo_parada_nao_planejada = Math.floor(randomNumber(0, 40)); // Varie de 0 a 40
    const tempo_operacao_real = tempo_planejado_producao - tempo_parada_nao_planejada;
    const tempo_ciclo_ideal = 1; // Tempo de ciclo ideal
    const tempo_ciclo_real = randomNumber(0.5, 1); // Tempo de ciclo real deve ser menor que o ideal

    const quantidade_total_produzida = Math.floor(tempo_operacao_real / tempo_ciclo_real);
    const quantidade_refugos = Math.floor(randomNumber(0, quantidade_total_produzida * 0.2)); // Até 20% de refugos
    const quantidade_unidades_boas = quantidade_total_produzida - quantidade_refugos;

    // Calcular indicadores
    const disponibilidade = tempo_operacao_real / tempo_planejado_producao; // Disponibilidade deve ser <= 1
    const desempenho = (quantidade_total_produzida * tempo_ciclo_ideal) / tempo_operacao_real; // Desempenho deve ser <= 1
    const qualidade = quantidade_unidades_boas / quantidade_total_produzida; // Qualidade deve ser <= 1

    // Variação aleatória para os indicadores
    const variation = (Math.random() - 0.5) * 0.1; // Variação de -0.05 a +0.05
    previousData.disponibilidade = Math.max(0.6, Math.min(1, previousData.disponibilidade + variation));
    previousData.desempenho = Math.max(0.6, Math.min(1, previousData.desempenho + variation));
    previousData.qualidade = Math.max(0.6, Math.min(1, previousData.qualidade + variation));

    // OEE como produto dos indicadores
    const oee = previousData.disponibilidade * previousData.desempenho * previousData.qualidade;

    return {
        data_hora,
        id_maquina,
        id_operador,
        tempo_planejado_producao,
        tempo_parada_nao_planejada,
        tempo_operacao_real,
        tempo_ciclo_ideal,
        tempo_ciclo_real,
        quantidade_total_produzida,
        quantidade_unidades_boas,
        quantidade_refugos,
        disponibilidade: previousData.disponibilidade,
        desempenho: previousData.desempenho,
        qualidade: previousData.qualidade,
        oee
    };
}

// Função para inserir dados no banco
async function insertMockData() {
    const connection = await mysql.createConnection(dbConfig);

    try {
        const mockData = generateMockData();
        const query = `INSERT INTO indicadores_oee 
                       (data_hora, id_maquina, id_operador, tempo_planejado_producao, 
                        tempo_parada_nao_planejada, tempo_operacao_real, tempo_ciclo_ideal, 
                        tempo_ciclo_real, quantidade_total_produzida, quantidade_unidades_boas, 
                        quantidade_refugos, disponibilidade, desempenho, qualidade, oee) 
                       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`; 

        await connection.execute(query, [
            mockData.data_hora,
            mockData.id_maquina,
            mockData.id_operador,
            mockData.tempo_planejado_producao,
            mockData.tempo_parada_nao_planejada,
            mockData.tempo_operacao_real,
            mockData.tempo_ciclo_ideal,
            mockData.tempo_ciclo_real,
            mockData.quantidade_total_produzida,
            mockData.quantidade_unidades_boas,
            mockData.quantidade_refugos,
            mockData.disponibilidade,
            mockData.desempenho,
            mockData.qualidade,
            mockData.oee
        ]);

        console.log('Dados mockados inseridos com sucesso!');
    } catch (error) {
        console.error('Erro ao inserir dados mockados:', error);
    } finally {
        await connection.end();
    }
}

let insertInterval;

// Rota para iniciar a geração de dados mockados
app.post('/start', (req, res) => {
    if (!insertInterval) {
        insertInterval = setInterval(insertMockData, 1000); // 1 segundos
        insertMockData();
        res.json({ message: 'Geração de dados mockados iniciada. Inserindo a cada 1 segundos.' });
    } else {
        res.json({ message: 'A geração de dados já está em andamento.' });
    }
});

// Rota para parar a geração de dados mockados
app.post('/stop', (req, res) => {
    if (insertInterval) {
        clearInterval(insertInterval);
        insertInterval = null;
        res.json({ message: 'Geração de dados mockados interrompida.' });
    } else {
        res.json({ message: 'A geração de dados não está em andamento.' });
    }
});

// Rota para verificar o status do serviço
app.get('/status', (req, res) => {
    res.json({
        status: 'online',
        dataGenerationActive: !!insertInterval,
        insertionInterval: '1 segundos'
    });
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Microserviço de geração de dados mockados rodando na porta ${port}`);
});
