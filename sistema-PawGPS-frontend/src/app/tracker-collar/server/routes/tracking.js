const express = require('express');
const router = express.Router();
const { clients } = require('../app');

router.post('/update', (req, res) => {
    const { deviceId, lat, lng, accuracy } = req.body;

    if (!deviceId || !lat || !lng) {
        return res.status(400).json({ error: "Datos incompletos" });
    }

    // Validar deviceId
    if (!['collar1', 'collar2'].includes(deviceId)) {
        return res.status(400).json({ error: "Dispositivo no válido" });
    }

    clients.forEach((ws) => {
        if (ws.readyState === ws.OPEN) {
            ws.send(JSON.stringify({
                type: 'LOCATION_UPDATE',
                deviceId,
                lat: parseFloat(lat),
                lng: parseFloat(lng),
                accuracy: accuracy ? parseFloat(accuracy) : 0,
                timestamp: Date.now(),
                markerColor: deviceId === 'collar1' ? '#4285F4' : '#34A853'
            }));
        }
    });

    res.json({ success: true, message: "Ubicación actualizada" });
});

module.exports = router;