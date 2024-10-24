import WebSocket, { WebSocketServer } from 'ws';

// WebSocket сервер үүсгэх
const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (ws: WebSocket) => {
  console.log('Клиент холбогдлоо.');

  // Клиентээс мессеж хүлээн авах
  ws.on('message', (message: string) => {
    console.log(`Клиентээс ирсэн: ${message}`);

    // Буцаан клиентэд хариу илгээх
    ws.send(`Сервер хүлээн авлаа: ${message}`);
  });

  // Клиент холбогдсон үед мессеж илгээх

  ws.send('WebSocket сервертэй холбогдлоо!');
});

console.log('WebSocket сервер 8080 порт дээр ажиллаж байна.');
