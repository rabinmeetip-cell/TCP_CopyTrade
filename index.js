const WebSocket = require('ws');
const PORT = process.env.PORT || 10000;

const wss = new WebSocket.Server({ port: PORT }, () => {
    console.log('Server is running on port', PORT);
});

wss.on('connection', (ws) => {
    console.log('Client connected');
    
    ws.on('message', (data) => {
        // รับข้อมูลจาก Master แล้วกระจายให้ Slave ทุกคนทันที
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(data.toString());
            }
        });
    });

    ws.on('close', () => console.log('Client disconnected'));
});
