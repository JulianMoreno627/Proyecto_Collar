package com.sistema.pawgps.controladores;

import com.sistema.pawgps.modelo.Ubicacion;
import com.sistema.pawgps.modelo.Dispositivo;
import com.sistema.pawgps.servicios.UbicacionService;
import com.sistema.pawgps.servicios.DispositivoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ubicaciones")
public class UbicacionController {

    @Autowired
    private UbicacionService ubicacionService;

    @Autowired
    private DispositivoService dispositivoService;

    @PostMapping
    public ResponseEntity<Ubicacion> registrarUbicacion(
            @RequestParam Double latitud,
            @RequestParam Double longitud,
            @RequestParam Long dispositivoId) {
        Dispositivo dispositivo = dispositivoService.obtenerDispositivoPorId(dispositivoId);
        return ResponseEntity.ok(ubicacionService.registrarUbicacion(latitud, longitud, dispositivo));
    }

    @GetMapping("/actual")
    public ResponseEntity<Ubicacion> obtenerUbicacionActual(@RequestParam Long dispositivoId) {
        Dispositivo dispositivo = dispositivoService.obtenerDispositivoPorId(dispositivoId);
        return ResponseEntity.ok(ubicacionService.obtenerUbicacionActual(dispositivo));
    }

    @GetMapping("/historial")
    public ResponseEntity<List<Ubicacion>> obtenerHistorialUbicaciones(@RequestParam Long dispositivoId) {
        Dispositivo dispositivo = dispositivoService.obtenerDispositivoPorId(dispositivoId);
        return ResponseEntity.ok(ubicacionService.obtenerHistorialUbicaciones(dispositivo));
    }
}
