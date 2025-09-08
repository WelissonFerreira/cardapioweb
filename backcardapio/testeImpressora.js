const printer = require('@thiagoelg/node-printer');

const nomeImpressora = 'POS-58';

const textoParaImprimir = 'TESTE DE IMPRESSÃO PELO NODE.JS\n\nObrigado!'

printer.printDirect({
    // Buffer.from garante a formatação correta

    data: Buffer.from(textoParaImprimir, 'latin1'),
    printer: nomeImpressora,
    type: 'RAW',
    success: function(jobID) {
        console.log('Impressão enviada, job ID: ' + jobID);
    },
    error: function(error) {
        console.error('Erro ao imprimir:', error)
    }
})