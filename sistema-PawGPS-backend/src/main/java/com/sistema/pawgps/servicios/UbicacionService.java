package com.sistema.pawgps.servicios;

import com.sistema.pawgps.modelo.Ubicacion;
import com.sistema.pawgps.modelo.Dispositivo;
import com.sistema.pawgps.repositorios.UbicacionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class UbicacionService {

    @Autowired
    private UbicacionRepository ubicacionRepository;

    public Ubicacion registrarUbicacion(Double latitud, Double longitud, Dispositivo dispositivo) {
        Ubicacion ubicacion = new Ubicacion();
        ubicacion.setLatitud(latitud);
        ubicacion.setLongitud(longitud);
        ubicacion.setFechaHora(LocalDateTime.now());
        ubicacion.setDispositivo(dispositivo);
        return ubicacionRepository.save(ubicacion);
    }

    public Ubicacion obtenerUbicacionActual(Dispositivo dispositivo) {
        return ubicacionRepository.findFirstByDispositivoOrderByFechaHoraDesc(dispositivo);
    }

    public List<Ubicacion> obtenerHistorialUbicaciones(Dispositivo dispositivo) {
        return ubicacionRepository.findByDispositivoOrderByFechaHoraDesc(dispositivo);
    }
}