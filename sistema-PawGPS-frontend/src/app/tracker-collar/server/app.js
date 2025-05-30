const express = require('express');
const WebSocket = require('ws');
const path = require('path');
const http = require('http');
const os = require('os');
const authRouter = require('./routes/auth');
const trackingRouter = require('./routes/tracking');

const app = express();
const PORT = process.env.PORT || 3000;

// Servir archivos estáticos desde el directorio actual
app.use(express.static(path.join(__dirname, '..')));
app.use(express.json());
app.use('/auth', authRouter);
app.use('/api', trackingRouter);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  next();
});

// Función para obtener la IP local
function getLocalIpAddress() {
    const interfaces = os.networkInterfaces();
    for (const ifaceName in interfaces) {
        const iface = interfaces[ifaceName];
        for (const config of iface) {
            if (config.family === 'IPv4' && !config.internal) {
                return config.address;
            }
        }
    }
    return 'localhost';
}

// Rutas actualizadas para los collares
app.get('/collar1', (req, res) => {
    res.sendFile(path.join(__dirname, '../collar1-sender.html'));
});

app.get('/collar2', (req, res) => {
    res.sendFile(path.join(__dirname, '../collar2-sender.html'));
});

app.get('/tracking.html', (req, res) => {
  const device = req.query.device;
  if (!device || (device !== 'collar1' && device !== 'collar2')) {
    return res.status(400).send('Dispositivo no especificado');
  }
  res.sendFile(path.join(__dirname, '../tracking.html'));
});

app.post('/api/update-location', (req, res) => {
    const { deviceId, lat, lng, accuracy, authCode } = req.body;

    const validDevices = {
        'collar1': {
            authCode: "1234567",
            initialPos: { lat: 1.200825, lng: -77.280979 }
        },
        'collar2': {
            authCode: "7654321",
            initialPos: { lat: 0.830824, lng: -77.641004 }
        }
    };

    const device = validDevices[deviceId];

    if (!device || authCode !== device.authCode) {
        return res.status(403).json({ error: "Acceso no autorizado" });
    }

    const finalLat = lat || device.initialPos.lat;
    const finalLng = lng || device.initialPos.lng;
    const finalAccuracy = accuracy || 0;

    if (isNaN(finalLat) || isNaN(finalLng)) {
        return res.status(400).json({ error: "Coordenadas inválidas" });
    }

    broadcastLocation({
        deviceId,
        lat: finalLat,
        lng: finalLng,
        accuracy: finalAccuracy,
        markerColor: deviceId === 'collar1' ? '#4285F4' : '#34A853'
    });

    res.json({
        success: true,
        message: `Ubicación de ${deviceId} recibida`,
        receivedPosition: { lat: finalLat, lng: finalLng }
    });
});

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const clients = new Set();

wss.on('connection', (ws) => {
    clients.add(ws);

    ws.on('message', (message) => {
        try {
            const data = JSON.parse(message);
            if (data.type === 'ping') {
                ws.send(JSON.stringify({ type: 'pong' }));
            }
        } catch (err) {
            console.error('Error procesando mensaje WebSocket:', err);
        }
    });

    ws.on('close', () => {
        clients.delete(ws);
    });

    ws.send(JSON.stringify({
        type: "CONNECTION_ESTABLISHED",
        message: "WebSocket activo",
        timestamp: Date.now()
    }));
});

function broadcastLocation(data) {
    const message = JSON.stringify({
        type: "LOCATION_UPDATE",
        deviceId: data.deviceId,
        lat: data.lat,
        lng: data.lng,
        accuracy: data.accuracy,
        timestamp: Date.now(),
        markerColor: data.markerColor,
        deviceName: data.deviceId === 'collar1' ? 'Collar 1' : 'Collar 2 (Ipiales)'
    });

    clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    });
}

// Obtener IP local
const localIp = getLocalIpAddress();

// Iniciar servidor escuchando en todas las interfaces
server.listen(PORT, '0.0.0.0', () => {
    console.log('==================================================');
    console.log(`🔥 Servidor de rastreo iniciado en el puerto ${PORT}`);
    console.log('==================================================');
    console.log(`🔗 Acceso LOCAL: http://localhost:${PORT}`);
    console.log(`📱 Acceso DESDE CELULAR (misma red WiFi): http://${localIp}:${PORT}`);
    console.log('--------------------------------------------------');
    console.log('📡 Endpoints disponibles:');
    console.log(`- Collar 1: http://${localIp}:${PORT}/collar1`);
    console.log(`- Collar 2: http://${localIp}:${PORT}/collar2`);
    console.log(`- API Update: POST http://${localIp}:${PORT}/api/update-location`);
    console.log(`- Autenticación: POST http://${localIp}:${PORT}/auth/login`);
    console.log('--------------------------------------------------');
    console.log('💡 Instrucciones para uso móvil:');
    console.log('1. Conecta tu celular a la misma red WiFi');
    console.log(`2. Abre en el navegador: http://${localIp}:${PORT}/collar1`);
    console.log('3. Permite el acceso a la ubicación cuando se solicite');
    console.log('==================================================');
});

module.exports = { app, server, clients, broadcastLocation };