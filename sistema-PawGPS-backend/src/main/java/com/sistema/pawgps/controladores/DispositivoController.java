package com.sistema.pawgps.controladores;

import com.sistema.pawgps.modelo.Dispositivo;
import com.sistema.pawgps.servicios.DispositivoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dispositivos")
public class DispositivoController {

    @Autowired
    private DispositivoService dispositivoService;

    @GetMapping("/admin/todos")
    public List<Dispositivo> obtenerTodosDispositivos() {
        return dispositivoService.obtenerTodosDispositivos();
    }

    @GetMapping("/admin/cantidad")
    public long obtenerCantidadDispositivos() {
        return dispositivoService.contarDispositivos();
    }

    @DeleteMapping("/admin/{id}")
    public ResponseEntity<Void> eliminarDispositivo(@PathVariable Long id) {
        dispositivoService.eliminarDispositivo(id);
        return ResponseEntity.noContent().build();
    }
}