package com.sistema.pawgps.controladores;

import com.sistema.pawgps.modelo.Dispositivo;
import com.sistema.pawgps.modelo.Usuario;
import com.sistema.pawgps.servicios.DispositivoService;
import com.sistema.pawgps.servicios.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dispositivos")
public class DispositivoController {

    @Autowired
    private DispositivoService dispositivoService;

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping
    public List<Dispositivo> obtenerTodosDispositivos() {
        return dispositivoService.obtenerTodosDispositivos();
    }

    @GetMapping("/usuario")
    public List<Dispositivo> obtenerMisDispositivos() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Usuario usuario = usuarioService.obtenerUsuarioPorEmail(auth.getName());
        return dispositivoService.obtenerDispositivosPorUsuario(usuario);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Dispositivo> obtenerDispositivoPorId(@PathVariable Long id) {
        Dispositivo dispositivo = dispositivoService.obtenerDispositivoPorId(id);
        return dispositivo != null ? ResponseEntity.ok(dispositivo) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<Dispositivo> registrarDispositivo(@RequestBody Dispositivo dispositivo) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Usuario usuario = usuarioService.obtenerUsuarioPorEmail(auth.getName());
        dispositivo.setUsuario(usuario);
        return ResponseEntity.ok(dispositivoService.guardarDispositivo(dispositivo));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarDispositivo(@PathVariable Long id) {
        dispositivoService.eliminarDispositivo(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/contar")
    public ResponseEntity<Long> contarDispositivosActivos() {
        return ResponseEntity.ok(dispositivoService.contarDispositivosActivos());
    }
}
