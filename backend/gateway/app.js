// api-gateway.js
require('dotenv').config();
const express = require('express');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Middleware para autenticar o JWT (somente para rotas privadas)
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Acesso negado. Token não fornecido.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(403).json({ message: 'Token expirado.' });
        }
        return res.status(403).json({ message: 'Token inválido.' });
    }
};


// Rota de Logout
app.post('/auth/logout', authenticateJWT, async (req, res) => {
    const { userId } = req.body;
    try {
        const secret = process.env.SECRET;
        jwt.sign(
            { id: userId },
            secret,
            { expiresIn: '0s' }
        );
        authenticateJWT(req, res, () => {
            res.status(200).json({ message: 'Logout realizado com sucesso.' });
        });
    } catch (error) {
        res.status(error.response?.status || 500).json(error.response?.data || { message: 'Erro no logout' });
    }
});
    

// Rota de Login (público, não precisa de autenticação)
app.post('/auth/login', async (req, res) => {
    try {
        const response = await axios.post(`${process.env.USER_SERVICE_URL}/auth/login`, req.body);
        res.json(response.data); 
    } catch (error) {
        //console.log(error); // Adicionando log do erro
        res.status(error.response?.status || 500).json(error.response?.data || { message: 'Erro no login' });
    }
});

// Rota de Registro (público, não precisa de autenticação)
app.post('/auth/register', async (req, res) => {
    try {
        const response = await axios.post(`${process.env.USER_SERVICE_URL}/auth/register`, req.body);
        res.json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json(error.response?.data || { message: 'Erro no registro' });
    }
});

// Rota privada protegida (exemplo)
app.get('/user/:id', authenticateJWT, async (req, res) => {
    try {
        // Encaminha a requisição para o microserviço de usuário (rota protegida)
        const response = await axios.get(`${process.env.USER_SERVICE_URL}/user/${req.params.id}`);
        res.json(response.data);  
    } catch (error) {
        res.status(error.response?.status || 500).json(error.response?.data || { message: 'Erro ao acessar o usuário' });
    }
});

// Rota para acessar indicadores de OEE de todas as máquinas
app.get('/indicadores/oee', authenticateJWT, async (req, res) => {
    try {
        const response = await axios.get(`${process.env.INDICADORES_SERVICE_URL}/indicadores/oee`);
        res.json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({ message: 'Erro ao acessar os indicadores de OEE.' });
    }
});

// Rota para obter o OEE médio de operadores por data
app.get('/indicadores/oee/:startDate/:endDate', authenticateJWT, async (req, res) => {
    try {
        const response = await axios.get(`${process.env.INDICADORES_SERVICE_URL}/indicadores/oee/${req.params.startDate}/${req.params.endDate}`);
        res.json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({ message: 'Erro ao acessar o OEE dos operadores.' });
    }
});

// rota para obter o OEE medio de uma maquina por data
app.get('/indicadores/oee/:id_maquina/:startDate/:endDate', authenticateJWT, async (req, res) => {
    try {
        const response = await axios.get(`${process.env.INDICADORES_SERVICE_URL}/indicadores/oee/${req.params.id_maquina}/${req.params.startDate}/${req.params.endDate}`);
        res.json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({ message: 'Erro ao acessar o OEE dos operadores.' });
    }
});

// Rota para acessar indicadores de OEE de uma máquina específica
app.get('/indicadores/oee/:id_maquina', authenticateJWT, async (req, res) => {
    try {
        const response = await axios.get(`${process.env.INDICADORES_SERVICE_URL}/indicadores/oee/${req.params.id_maquina}`);
        res.json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({ message: 'Erro ao acessar o OEE da máquina.' });
    }
});

// Rota para obter lista de maquinas
app.get('/indicadores/maquinas', authenticateJWT, async (req, res) => {
    try {
        const response = await axios.get(`${process.env.INDICADORES_SERVICE_URL}/indicadores/maquinas`);
        res.json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({ message: 'Erro ao acessar o OEE da máquina.' });
    }
});

// Rota para obter lista de maquinas
app.get('/indicadores/maquinas/:startDate/:endDate', authenticateJWT, async (req, res) => {
    try {
        const response = await axios.get(`${process.env.INDICADORES_SERVICE_URL}/indicadores/maquinas/${req.params.startDate}/${req.params.endDate}`);
        res.json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({ message: 'Erro ao acessar o OEE da máquina.' });
    }
});


// Rota para acessar a disponibilidade media de uma maquina especifica
app.get('/indicadores/disponibilidade', authenticateJWT, async (req, res) => {
    try {
        const response = await axios.get(`${process.env.INDICADORES_SERVICE_URL}/indicadores/disponibilidade`);
        res.json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({ message: 'Erro ao acessar o OEE da máquina.' });
    }
});


// Rota para acessar a disponibilidade media de uma maquina especifica
app.get('/indicadores/disponibilidade/:maquina', authenticateJWT, async (req, res) => {
    try {
        const response = await axios.get(`${process.env.INDICADORES_SERVICE_URL}/indicadores/disponibilidade/${req.params.maquina}`);
        res.json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({ message: 'Erro ao acessar o OEE da máquina.' });
    }
});

// Rota para acessar a performance media de uma maquina especifica
app.get('/indicadores/performance', authenticateJWT, async (req, res) => {
    try {
        const response = await axios.get(`${process.env.INDICADORES_SERVICE_URL}/indicadores/performance`);
        res.json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({ message: 'Erro ao acessar o OEE da máquina.' });
    }
});


// Rota para acessar a performance media de uma maquina especifica
app.get('/indicadores/performance/:maquina', authenticateJWT, async (req, res) => {
    try {
        const response = await axios.get(`${process.env.INDICADORES_SERVICE_URL}/indicadores/performance/${req.params.maquina}`);
        res.json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({ message: 'Erro ao acessar o OEE da máquina.' });
    }
});

// Rota para acessar a qualidade media de uma maquina especifica
app.get('/indicadores/qualidade', authenticateJWT, async (req, res) => {
    try {
        const response = await axios.get(`${process.env.INDICADORES_SERVICE_URL}/indicadores/qualidade`);
        res.json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({ message: 'Erro ao acessar o OEE da máquina.' });
    }
});


// Rota para acessar a qualidade media de uma maquina especifica
app.get('/indicadores/qualidade/:maquina', authenticateJWT, async (req, res) => {
    try {
        const response = await axios.get(`${process.env.INDICADORES_SERVICE_URL}/indicadores/qualidade/${req.params.maquina}`);
        res.json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({ message: 'Erro ao acessar o OEE da máquina.' });
    }
});


// Rota para acessar indicadores de operadores
app.get('/indicadores/operadores', authenticateJWT, async (req, res) => {
    try {
        const response = await axios.get(`${process.env.INDICADORES_SERVICE_URL}/indicadores/operadores`);
        res.json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({ message: 'Erro ao acessar o OEE dos operadores.' });
    }
});

// rota para obter o OEE medio de todas as maquinas por data
app.get('/indicadores/operadores/:startDate/:endDate', authenticateJWT, async (req, res) => {
    try {
        console.log(`${process.env.INDICADORES_SERVICE_URL}/indicadores/operadores/${req.params.startDate}/${req.params.endDate}`);
        const response = await axios.get(`${process.env.INDICADORES_SERVICE_URL}/indicadores/operadores/${req.params.startDate}/${req.params.endDate}`);
        res.json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({ message: 'Erro ao acessar o OEE dos operadores.' });
    }
});

// rota para obter o OEE medio de todas as maquinas por data
app.get('/indicadores/operadores/:id_operador', authenticateJWT, async (req, res) => {
    try {
        const response = await axios.get(`${process.env.INDICADORES_SERVICE_URL}/indicadores/operadores/${req.params.id_operador}`);
        res.json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({ message: 'Erro ao acessar o OEE dos operadores.' });
    }
});

// rota para obter o OEE medio de todas as maquinas por data
app.get('/indicadores/operadores/:id_operador/:startDate/:endDate', authenticateJWT, async (req, res) => {
    try {
        const response = await axios.get(`${process.env.INDICADORES_SERVICE_URL}/indicadores/operadores/${req.params.id_operador}/${req.params.startDate}/${req.params.endDate}`);
        res.json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({ message: 'Erro ao acessar o OEE dos operadores.' });
    }
});


// Rota para obter o OEE médio de um operador específico
app.get('/indicadores/operadores_maquina/:maquina/:startDate/:endDate', authenticateJWT, async (req, res) => {
    try {
        const response = await axios.get(`${process.env.INDICADORES_SERVICE_URL}/indicadores/operadores_maquina/${req.params.maquina}/${req.params.startDate}/${req.params.endDate}`);
        res.json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({ message: 'Erro ao acessar o OEE dos operadores.' });
    }
});


// Rota para add mock de dados
app.post('/start', authenticateJWT, async (req, res) => {
    try {
        const response = await axios.post(`${process.env.MOCK_SERVICE_URL}/start`);
        res.json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({ message: 'Erro ao acessar endpoint', details: error.message });
    }
});

// Rota para parar mock de dados
app.post('/stop', authenticateJWT, async (req, res) => {
    try {
        const response = await axios.post(`${process.env.MOCK_SERVICE_URL}/stop`);
        res.json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({ message: 'Erro ao acessar endpoint', details: error.message });
    }
});

// Rota para status do mock
app.get('/status', authenticateJWT, async (req, res) => {
    try {
        const response = await axios.get(`${process.env.MOCK_SERVICE_URL}/status`);
        res.json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({ message: 'Erro ao acessar endpoint', details: error.message });
    }
});



app.listen(3000, () => {
    console.log('API Gateway rodando na porta 3000');
});
