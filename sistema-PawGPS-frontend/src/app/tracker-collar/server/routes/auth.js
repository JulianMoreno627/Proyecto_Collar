const express = require('express');
const router = express.Router();

const VALID_CREDENTIALS = {
    'collar1': { password: "1234567", page: "tracking.html" },
    'collar2': { password: "7654321", page: "tracking2.html" }
};

router.post('/login', (req, res) => {
    const { deviceId, password } = req.body;
    const device = VALID_CREDENTIALS[deviceId];

    if (!device || password !== device.password) {
        return res.status(401).json({ 
            success: false,
            message: "Credenciales inválidas" 
        });
    }

    res.json({
        success: true,
        redirect: `${device.page}?auth=true&device=${deviceId}`
    });
});

module.exports = router;