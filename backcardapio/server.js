// server.js

// 1. IMPORTAÇÕES E CONFIGURAÇÃO
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');
const printer = require('@thiagoelg/node-printer')
const nomeDaImpressora = 'POS-58';


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

// 2. REFERÊNCIAS AO FIRESTORE
const db = admin.firestore();
const pedidosRef = db.collection('pedidos');

// 3. FUNÇÃO DE IMPRESSÃO - É AQUI ONDE SEU CÓDIGO ESTAVA FALTANDO
// Esta função simula a impressão, apenas para testar
function imprimirPedido(pedido) {
    // Monta a string com todos os dados do pedido
    let dadosParaImpressao = "--- NOVO PEDIDO ---\n\n";
    dadosParaImpressao += `Nome do Cliente: ${pedido.cliente.nome}\n`;
    dadosParaImpressao += `Telefone: ${pedido.cliente.telefone}\n`;
    dadosParaImpressao += `Tipo de Pedido: ${pedido.cliente.tipo}\n\n`;
    
    dadosParaImpressao += "--- ITENS DO PEDIDO ---\n";
    pedido.itens.forEach(item => {
        dadosParaImpressao += `${item.quantidade}x ${item.nome} - R$ ${item.preco.toFixed(2).replace('.', ',')}\n`;
        if (item.observacoes) {
            dadosParaImpressao += ` - Obs: ${item.observacoes}\n`;
        }
    });

    dadosParaImpressao += "\n--------------------\n";
    dadosParaImpressao += `Forma de Pagamento: ${pedido.pagamento}\n`;
    if (pedido.troco > 0) {
        dadosParaImpressao += `Troco para: R$ ${pedido.troco.toFixed(2).replace('.', ',')}\n`;
    }
    dadosParaImpressao += "--------------------\n\n";

    // Envia os dados para a impressora
    printer.printDirect({
        data: Buffer.from(dadosParaImpressao, 'latin1'),
        printer: nomeDaImpressora,
        type: 'RAW',
        success: function(jobID) {
            console.log('Impressão enviada, ID do trabalho: ' + jobID);
        },
        error: function(err) {
            console.error('Erro ao imprimir:', err);
        }
    });
}

// 4. ESCUTA DOS PEDIDOS DO FIRESTORE
pedidosRef.onSnapshot(snapshot => {
    snapshot.docChanges().forEach(change => {
        if (change.type === 'added') {
            const novoPedido = change.doc.data();
            const docId = change.doc.id; // <-- Obtém o ID do documento
            
            console.log('Novo pedido recebido do Firestore!');
            
            // Chama a função de impressão
            imprimirPedido(novoPedido);

            // Adicione a lógica para apagar o documento depois de imprimir
            db.collection('pedidos').doc(docId).delete()
                .then(() => {
                    console.log(`Pedido ${docId} removido do Firestore.`);
                })
                .catch(err => {
                    console.error('Erro ao remover o pedido:', err);
                });
        }
    });
}, err => {
    console.error('Erro ao ouvir mudanças no Firestore:', err);
});


console.log('Servidor de impressão iniciado. Ouvindo novos pedidos no Firestore...');