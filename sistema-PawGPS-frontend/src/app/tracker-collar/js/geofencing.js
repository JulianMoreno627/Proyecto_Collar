const geofences = {};
window.lastKnownPositions = {};

function initGeofencing(map, deviceId) {
    if (!window.google || !google.maps || !google.maps.drawing) {
        showAlert("Herramientas de dibujo no disponibles", "error");
        return;
    }

    // Eliminar geocerca existente si hay una
    if (geofences[deviceId]) {
        geofences[deviceId].setMap(null);
        delete geofences[deviceId];
    }

    const drawingManager = new google.maps.drawing.DrawingManager({
        drawingMode: google.maps.drawing.OverlayType.POLYGON,
        drawingControl: true,
        drawingControlOptions: {
            position: google.maps.ControlPosition.TOP_CENTER,
            drawingModes: [google.maps.drawing.OverlayType.POLYGON]
        },
        polygonOptions: {
            editable: true,
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.35,
            clickable: false
        }
    });

    drawingManager.setMap(map);

    google.maps.event.addListener(drawingManager, 'polygoncomplete', (polygon) => {
        geofences[deviceId] = polygon;
        showAlert(`Zona segura definida para ${deviceId}`, 'success');
        
        // Verificar posición actual contra la nueva geocerca
        if (window.lastKnownPositions[deviceId]) {
            checkIfOutsideGeofence(deviceId, window.lastKnownPositions[deviceId]);
        }
    });
}

function clearGeofence(deviceId) {
    if (geofences[deviceId]) {
        geofences[deviceId].setMap(null);
        delete geofences[deviceId];
        showAlert(`Zona segura eliminada para ${deviceId}`, 'success');
    }
}

function checkIfOutsideGeofence(deviceId, position) {
    if (!geofences[deviceId] || !position) return;

    const point = new google.maps.LatLng(position.lat, position.lng);
    const isInside = google.maps.geometry.poly.containsLocation(point, geofences[deviceId]);

    if (!isInside) {
        triggerAlarm(deviceId);
    }
}

function triggerAlarm(deviceId) {
    const alertMessage = `¡ALERTA! ${deviceId} ha salido de la zona segura`;
    if (window.showAlert) {
        window.showAlert(alertMessage, 'error');
    }
}

// Exportar funciones al scope global
window.initGeofencing = initGeofencing;
window.clearGeofence = clearGeofence;
window.checkIfOutsideGeofence = checkIfOutsideGeofence;
window.triggerAlarm = triggerAlarm;