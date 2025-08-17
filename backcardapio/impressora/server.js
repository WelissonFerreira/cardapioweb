// backcardapio/server.js
const express = require('express');
const cors = require("cors");
const { imprimirPedido } = require('./imprimir'); // nosso código de impressão

const app = express();
const PORT = 3000;

// middlewares
app.use(cors());
app.use(express.json());

// Endpoint para receber pedidos do frontend
app.post('/api/pedido', (req, res) => {
    console.log('Recebendo pedido...');
    const pedido = req.body;
    console.log('Pedido recebido:', pedido);

    // Chama a função de impressão
    imprimirPedido(pedido);

    res.json({ status: 'sucesso', mensagem: 'Pedido enviado para impressão!' });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
