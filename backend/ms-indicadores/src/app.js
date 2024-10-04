require('dotenv').config();
const express = require('express');
const Indicadores = require('./indicadores');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swaggerConfig');

const app = express();
const indicadores = new Indicadores();

// Middleware para JSON
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Rota para obter o OEE médio de todas as máquinas
app.get('/indicadores/oee', async (req, res) => {
    try {
        const oee = await indicadores.get_OEE();
        res.status(200).json(oee);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar OEE.' });
    }
});
// rota para obter o OEE medio de todas as maquinas por data
app.get('/indicadores/oee/:startDate/:endDate', async (req, res) => {
    const { startDate, endDate } = req.params;
    try {
        const oee = await indicadores.get_OEE(null,startDate, endDate);
        res.status(200).json(oee);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar OEE.' });
    }
});
// rota para obter o OEE medio de uma maquina por data
app.get('/indicadores/oee/:id_maquina/:startDate/:endDate', async (req, res) => {
    const { id_maquina, startDate, endDate } = req.params;
    try {
        const oee = await indicadores.get_OEE(id_maquina, startDate, endDate);
        res.status(200).json(oee);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar OEE.' });
    }
});


// Rota para obter o OEE médio de uma máquina específica
app.get('/indicadores/oee/:id_maquina', async (req, res) => {
    const { id_maquina } = req.params;
    try {
        const oeeMaquina = await indicadores.get_OEE(id_maquina);
        res.status(200).json(oeeMaquina);
    } catch (error) {
        res.status(500).json({ message: `Erro ao buscar OEE da máquina ${maquina}.` });
    }
});

// Rota para obter a Disponibilidade média de todas as máquinas
app.get('/indicadores/disponibilidade', async (req, res) => {
    try {
        const disponibilidade = await indicadores.get_Disponibilidade();
        res.status(200).json(disponibilidade);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar Disponibilidade.' });
    }
});

// Rota para obter a Disponibilidade média de uma máquina específica
app.get('/indicadores/disponibilidade/:maquina', async (req, res) => {
    const { maquina } = req.params;
    try {
        const disponibilidadeMaquina = await indicadores.get_Disponibilidade(maquina);
        res.status(200).json(disponibilidadeMaquina);
    } catch (error) {
        res.status(500).json({ message: `Erro ao buscar Disponibilidade da máquina ${maquina}.` });
    }
});

// Rota para obter a Performance média de todas as máquinas
app.get('/indicadores/performance', async (req, res) => {
    try {
        const performance = await indicadores.get_Performance();
        res.status(200).json(performance);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar Performance.' });
    }
});

// Rota para obter a Performance média de uma máquina específica
app.get('/indicadores/performance/:maquina', async (req, res) => {
    const { maquina } = req.params;
    try {
        const performanceMaquina = await indicadores.get_Performance(maquina);
        res.status(200).json(performanceMaquina);
    } catch (error) {
        res.status(500).json({ message: `Erro ao buscar Performance da máquina ${maquina}.` });
    }
});

// Rota para obter a Qualidade média de todas as máquinas
app.get('/indicadores/qualidade', async (req, res) => {
    try {
        const qualidade = await indicadores.get_Qualidade();
        res.status(200).json(qualidade);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar Qualidade.' });
    }
});

// Rota para obter a Qualidade média de uma máquina específica
app.get('/indicadores/qualidade/:maquina', async (req, res) => {
    const { maquina } = req.params;
    try {
        const qualidadeMaquina = await indicadores.get_Qualidade(maquina);
        res.status(200).json(qualidadeMaquina);
    } catch (error) {
        res.status(500).json({ message: `Erro ao buscar Qualidade da máquina ${maquina}.` });
    }
});

// Rota para obter o OEE médio dos operadores
app.get('/indicadores/operadores', async (req, res) => {
    try {
        const operadores = await indicadores.get_Operadores();
        res.status(200).json(operadores);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar OEE dos operadores.' });
    }
});

// Rota para obter o OEE médio dos operadores por data
app.get('/indicadores/operadores/:startDate/:endDate', async (req, res) => {
    const { startDate, endDate } = req.params;
    try {
        const operadores = await indicadores.get_Operadores(null, startDate, endDate);
        res.status(200).json(operadores);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar OEE dos operadores' });
    }
});


// Rota para obter o OEE médio de um operador específico
app.get('/indicadores/operadores/:id_operador', async (req, res) => {
    const { id_operador } = req.params;
    try {
        const oeeOperador = await indicadores.get_Operadores(id_operador);
        res.status(200).json(oeeOperador);
    } catch (error) {
        res.status(500).json({ message: `Erro ao buscar OEE do operador ${operador}.` });
    }
});

app.get('/indicadores/operadores/:id_operador/:startDate/:endDate', async (req, res) => {
    const { id_operador, startDate, endDate } = req.params;
    try {
        const oeeOperador = await indicadores.get_Operadores(id_operador, startDate, endDate);
        res.status(200).json(oeeOperador);
    } catch (error) {
        res.status(500).json({ message: `Erro ao buscar OEE do operador ${operador}.` });
    }
});


// Rota para obter o OEE dos operadores por dia
app.get('/indicadores/operadores_maquina/:maquina/:startDate/:endDate', async (req, res) => {
    const { maquina, startDate, endDate } = req.params;
    try {
        const oeeOperadoresPorDia = await indicadores.get_OEE_Operadores_PorDia(maquina, startDate, endDate);
        res.status(200).json(oeeOperadoresPorDia);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar OEE dos operadores por dia.' });
    }
});

// Iniciar o servidor
app.listen(5000, () => {
    console.log('Microserviço de Indicadores rodando na porta 5000');
});