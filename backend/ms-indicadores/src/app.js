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

/**
 * @swagger
 * /indicadores/oee:
 *   get:
 *     summary: Retorna o OEE médio de todas as máquinas
 *     description: Obtém o OEE médio de todas as máquinas registradas.
 *     responses:
 *       200:
 *         description: OEE médio de todas as máquinas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   maquina:
 *                     type: string
 *                     description: Nome da máquina
 *                   OEE:
 *                     type: string
 *                     description: OEE médio da máquina em porcentagem
 *       500:
 *         description: Erro ao buscar o OEE
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensagem de erro
 */


// Rota para obter o OEE médio de todas as máquinas
app.get('/indicadores/oee', async (req, res) => {
    try {
        const oee = await indicadores.get_OEE();
        res.status(200).json(oee);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar OEE.' });
    }
});
/**
 * @swagger
 * /indicadores/oee/{maquina}:
 *   get:
 *     summary: Retorna o OEE médio de uma máquina específica
 *     description: Obtém o OEE médio de uma máquina específica com base no nome da máquina.
 *     parameters:
 *       - in: path
 *         name: maquina
 *         schema:
 *           type: string
 *         required: true
 *         description: Nome da máquina
 *     responses:
 *       200:
 *         description: OEE médio da máquina
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 maquina:
 *                   type: string
 *                   description: Nome da máquina
 *                 OEE:
 *                   type: string
 *                   description: OEE médio da máquina em porcentagem
 *       500:
 *         description: Erro ao buscar o OEE da máquina
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensagem de erro
 */

// Rota para obter o OEE médio de uma máquina específica
app.get('/indicadores/oee/:maquina', async (req, res) => {
    const { maquina } = req.params;
    try {
        const oeeMaquina = await indicadores.get_OEE(maquina);
        res.status(200).json(oeeMaquina);
    } catch (error) {
        res.status(500).json({ message: `Erro ao buscar OEE da máquina ${maquina}.` });
    }
});
/**
 * @swagger
 * /indicadores/disponibilidade:
 *   get:
 *     summary: Retorna a disponibilidade média de todas as máquinas
 *     description: Obtém a disponibilidade média de todas as máquinas registradas.
 *     responses:
 *       200:
 *         description: Disponibilidade média de todas as máquinas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   maquina:
 *                     type: string
 *                     description: Nome da máquina
 *                   disponibilidade:
 *                     type: string
 *                     description: Disponibilidade média da máquina em porcentagem
 *       500:
 *         description: Erro ao buscar a disponibilidade
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensagem de erro
 */

// Rota para obter a Disponibilidade média de todas as máquinas
app.get('/indicadores/disponibilidade', async (req, res) => {
    try {
        const disponibilidade = await indicadores.get_Disponibilidade();
        res.status(200).json(disponibilidade);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar Disponibilidade.' });
    }
});
/**
 * @swagger
 * /indicadores/disponibilidade/{maquina}:
 *   get:
 *     summary: Retorna a disponibilidade média de uma máquina específica
 *     description: Obtém a disponibilidade média de uma máquina específica com base no nome da máquina.
 *     parameters:
 *       - in: path
 *         name: maquina
 *         schema:
 *           type: string
 *         required: true
 *         description: Nome da máquina
 *     responses:
 *       200:
 *         description: Disponibilidade média da máquina
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 maquina:
 *                   type: string
 *                   description: Nome da máquina
 *                 disponibilidade:
 *                   type: string
 *                   description: Disponibilidade média da máquina em porcentagem
 *       500:
 *         description: Erro ao buscar a disponibilidade da máquina
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensagem de erro
 */

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
/**
 * @swagger
 * /indicadores/performance:
 *   get:
 *     summary: Retorna a performance média de todas as máquinas
 *     description: Obtém a performance média de todas as máquinas registradas.
 *     responses:
 *       200:
 *         description: Performance média de todas as máquinas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   maquina:
 *                     type: string
 *                     description: Nome da máquina
 *                   performance:
 *                     type: string
 *                     description: Performance média da máquina em porcentagem
 *       500:
 *         description: Erro ao buscar a performance
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensagem de erro
 */

// Rota para obter a Performance média de todas as máquinas
app.get('/indicadores/performance', async (req, res) => {
    try {
        const performance = await indicadores.get_Performance();
        res.status(200).json(performance);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar Performance.' });
    }
});
/**
 * @swagger
 * /indicadores/performance/{maquina}:
 *   get:
 *     summary: Retorna a performance média de uma máquina específica
 *     description: Obtém a performance média de uma máquina específica com base no nome da máquina.
 *     parameters:
 *       - in: path
 *         name: maquina
 *         schema:
 *           type: string
 *         required: true
 *         description: Nome da máquina
 *     responses:
 *       200:
 *         description: Performance média da máquina
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 maquina:
 *                   type: string
 *                   description: Nome da máquina
 *                 performance:
 *                   type: string
 *                   description: Performance média da máquina em porcentagem
 *       500:
 *         description: Erro ao buscar a performance da máquina
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensagem de erro
 */

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
/**
 * @swagger
 * /indicadores/qualidade:
 *   get:
 *     summary: Retorna a qualidade média de todas as máquinas
 *     description: Obtém a qualidade média de todas as máquinas registradas.
 *     responses:
 *       200:
 *         description: Qualidade média de todas as máquinas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   maquina:
 *                     type: string
 *                     description: Nome da máquina
 *                   qualidade:
 *                     type: string
 *                     description: Qualidade média da máquina em porcentagem
 *       500:
 *         description: Erro ao buscar a qualidade
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensagem de erro
 */

// Rota para obter a Qualidade média de todas as máquinas
app.get('/indicadores/qualidade', async (req, res) => {
    try {
        const qualidade = await indicadores.get_Qualidade();
        res.status(200).json(qualidade);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar Qualidade.' });
    }
});
/**
 * @swagger
 * /indicadores/qualidade/{maquina}:
 *   get:
 *     summary: Retorna a qualidade média de uma máquina específica
 *     description: Obtém a qualidade média de uma máquina específica com base no nome da máquina.
 *     parameters:
 *       - in: path
 *         name: maquina
 *         schema:
 *           type: string
 *         required: true
 *         description: Nome da máquina
 *     responses:
 *       200:
 *         description: Qualidade média da máquina
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 maquina:
 *                   type: string
 *                   description: Nome da máquina
 *                 qualidade:
 *                   type: string
 *                   description: Qualidade média da máquina em porcentagem
 *       500:
 *         description: Erro ao buscar a qualidade da máquina
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensagem de erro
 */

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
/**
 * @swagger
 * /indicadores/operadores:
 *   get:
 *     summary: Retorna o OEE médio dos operadores
 *     description: Obtém o OEE médio de todos os operadores registrados.
 *     responses:
 *       200:
 *         description: OEE médio dos operadores
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   operador:
 *                     type: string
 *                     description: Nome do operador
 *                   OEE:
 *                     type: string
 *                     description: OEE médio do operador em porcentagem
 *       500:
 *         description: Erro ao buscar o OEE dos operadores
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensagem de erro
 */

// Rota para obter o OEE médio dos operadores
app.get('/indicadores/operadores', async (req, res) => {
    try {
        const operadores = await indicadores.get_Operadores();
        res.status(200).json(operadores);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar OEE dos operadores.' });
    }
});
/**
 * @swagger
 * /indicadores/operadores/{operador}:
 *   get:
 *     summary: Retorna o OEE médio de um operador específico
 *     description: Obtém o OEE médio de um operador específico com base no nome do operador.
 *     parameters:
 *       - in: path
 *         name: operador
 *         schema:
 *           type: string
 *         required: true
 *         description: Nome do operador
 *     responses:
 *       200:
 *         description: OEE médio do operador
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 operador:
 *                   type: string
 *                   description: Nome do operador
 *                 OEE:
 *                   type: string
 *                   description: OEE médio do operador em porcentagem
 *       500:
 *         description: Erro ao buscar o OEE do operador
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensagem de erro
 */

// Rota para obter o OEE médio de um operador específico
app.get('/indicadores/operadores/:operador', async (req, res) => {
    const { operador } = req.params;
    try {
        const oeeOperador = await indicadores.get_Operadores(operador);
        res.status(200).json(oeeOperador);
    } catch (error) {
        res.status(500).json({ message: `Erro ao buscar OEE do operador ${operador}.` });
    }
});
/**
 * @swagger
 * /indicadores/operadores_maquina/{maquina}/{startDate}/{endDate}:
 *   get:
 *     summary: Retorna o OEE dos operadores por dia para uma máquina específica
 *     description: Obtém o OEE dos operadores para uma determinada máquina em um intervalo de datas.
 *     parameters:
 *       - in: path
 *         name: maquina
 *         schema:
 *           type: string
 *         required: true
 *         description: Nome da máquina
 *       - in: path
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date-time
 *         required: true
 *         description: Data inicial no formato YYYY-MM-DD HH:MM:SS
 *       - in: path
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date-time
 *         required: true
 *         description: Data final no formato YYYY-MM-DD HH:MM:SS
 *     responses:
 *       200:
 *         description: OEE dos operadores por dia
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               additionalProperties:
 *                 type: object
 *                 properties:
 *                   operador:
 *                     type: string
 *                     description: Nome do operador
 *                   OEE:
 *                     type: string
 *                     description: OEE em porcentagem
 *       500:
 *         description: Erro ao buscar OEE dos operadores por dia
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensagem de erro
 */

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