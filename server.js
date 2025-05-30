const WebSocket = require('ws');

// استخدم البورت اللي بتديه Railway أو منصة الاستضافة، أو 8080 لو محلياً
const PORT = process.env.PORT || 8080;

const wss = new WebSocket.Server({ noServer: true });

const http = require('http');

const server = http.createServer();

server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
});

wss.on('connection', (ws) => {
  console.log('🔗 New client connected');

  ws.on('message', (message) => {
    console.log(`📩 Received: ${message}`);

    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on('close', () => {
    console.log('❌ Client disconnected');
  });

  ws.on('error', (error) => {
    console.log(`❗ Error: ${error.message}`);
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
