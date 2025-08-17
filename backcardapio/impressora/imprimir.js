/*// impressora-usb-pedidos.js
function imprimirPedido(pedido) {
    // Simulação: apenas exibe no console
    console.log('=== PEDIDO PARA IMPRESSORA ===');
    console.log(`Cliente: ${pedido.cliente.nome}`);
    console.log(`Telefone: ${pedido.cliente.telefone}`);
    console.log(`Tipo: ${pedido.cliente.tipo}`);
    if (pedido.endereco) {
        console.log('Endereço de entrega:', pedido.endereco);
    }
    console.log('Itens:');
    pedido.itens.forEach((item, i) => {
        console.log(`${i + 1}. ${item.quantidade}x ${item.nome} - R$ ${item.preco.toFixed(2)}`);
        if (item.observacoes) console.log(`   Observações: ${item.observacoes}`);
    });
    console.log(`Pagamento: ${pedido.pagamento}`);
    console.log(`Troco: R$ ${pedido.troco.toFixed(2)}`);
    console.log('==============================');
}

module.exports = { imprimirPedido };*/

// imprimir.js
function imprimirPedido(pedido) {
    console.log('=== Pedido recebido para impressão ===');
    console.log(JSON.stringify(pedido, null, 2)); // mostra de forma legível
}

module.exports = { imprimirPedido };