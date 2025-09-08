// pedidos-firebase.js

// Importa as referências do Firebase
import { db, collection, addDoc } from './firebase-config.js';

// Sua função de envio de pedido
async function enviarPedido(pedido) {
  try {
    const pedidosRef = collection(db, 'pedidos');
    const docRef = await addDoc(pedidosRef, pedido);
    console.log('Pedido enviado com ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Erro ao enviar pedido:', error);
    throw error;
  }
}

// Exporta a função para que possa ser usada em outros arquivos
export { enviarPedido };