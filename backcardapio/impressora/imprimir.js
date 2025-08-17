const escpos = require('escpos');

// Habilitar USB
escpos.USB = require('escpos-usb');

// Coloque aqui o VendorID e ProductID da sua impressora quando tiver
// Exemplo: const vendorId = 0x0416; const productId = 0x5011;
const vendorId = null;
const productId = null;

let device;
let printer;

try {
    if (vendorId && productId) {
        device = new escpos.USB(vendorId, productId);
        printer = new escpos.Printer(device);
} else {
    console.log('Impressora não configurada. Pedidos serão exibidos no console apenas.');
}
} catch (err) {
    console.log('Erro ao inicializar a impressora:', err.message);
    printer = null;
}

// Função para imprimir pedido
function imprimirPedido(pedido) {
    console.log('=== Pedido recebido para impressão ===');
    console.log(pedido);

if (!printer) {
    console.log('Impressão ignorada porque a impressora não está conectada ou configurada.');
    return;
}

device.open(function() {
    printer
    .align('CT')
    .text('=== PEDIDO ===')
    .align('LT')
    .text(`Cliente: ${pedido.cliente.nome}`)
    .text(`Telefone: ${pedido.cliente.telefone}`)
    .text(`Tipo: ${pedido.cliente.tipo}`)
    .text(`Pagamento: ${pedido.pagamento}`)
    .text('----------------------------');

    pedido.itens.forEach(item => {
        printer.text(`${item.quantidade}x ${item.nome} - R$${item.preco.toFixed(2)}`);
            if (item.observacoes && item.observacoes.trim() !== '') {
                printer.text(`Obs: ${item.observacoes}`);
    }
    });

    printer
    .text('----------------------------')
    .text(`Troco: R$${pedido.troco.toFixed(2)}`)
    .feed(3) // pular 3 linhas
    .cut()
    .close();});
}

module.exports = { imprimirPedido };