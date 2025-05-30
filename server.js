// server.js

const WebSocket = require('ws');
const PORT = 8080;

// إنشاء WebSocket Server
const wss = new WebSocket.Server({ port: PORT });

console.log(`WebSocket Server is running on ws://localhost:${PORT}`);

// لما Client يتصل
wss.on('connection', (ws) => {
  console.log('🔗 New client connected');

  // استقبال رسالة من الـ client
  ws.on('message', (message) => {
    console.log(`📩 Received: ${message}`);

    // إرسال الرسالة لكل العملاء المتصلين
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  // لما الاتصال يتقفل
  ws.on('close', () => {
    console.log('❌ Client disconnected');
  });

  // التعامل مع الخطأ
  ws.on('error', (error) => {
    console.log(`❗ Error: ${error.message}`);
  });
});
