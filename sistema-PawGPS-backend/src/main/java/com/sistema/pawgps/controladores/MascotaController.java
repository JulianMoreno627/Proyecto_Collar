package com.sistema.pawgps.controladores;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sistema.pawgps.modelo.Mascota;
import com.sistema.pawgps.modelo.Usuario;
import com.sistema.pawgps.servicios.MascotaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/mascotas")
public class MascotaController {

    @Autowired
    private MascotaService mascotaService;

    @Autowired
    private ObjectMapper objectMapper;  // Inyectar ObjectMapper para parseo JSON

    @GetMapping("/mis-mascotas")
    public List<Mascota> obtenerMisMascotas() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Usuario usuario = (Usuario) auth.getPrincipal();
        return mascotaService.obtenerMascotasPorUsuario(usuario);
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Mascota> registrarMascota(
            @RequestPart("mascota") String mascotaJson,
            @RequestPart(value = "foto", required = false) MultipartFile foto) throws IOException {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Usuario usuario = (Usuario) auth.getPrincipal();

        // Convertir JSON string a objeto Mascota
        Mascota mascota = objectMapper.readValue(mascotaJson, Mascota.class);

        Mascota mascotaGuardada = mascotaService.guardarMascota(mascota, usuario, foto);
        return ResponseEntity.ok(mascotaGuardada);
    }

    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Mascota> actualizarMascota(
            @PathVariable Long id,
            @RequestPart("mascota") String mascotaJson,
            @RequestPart(value = "foto", required = false) MultipartFile foto) throws IOException {

        // Parsear JSON string a objeto Mascota
        Mascota mascota = objectMapper.readValue(mascotaJson, Mascota.class);

        Mascota mascotaActualizada = mascotaService.actualizarMascota(id, mascota, foto);
        return ResponseEntity.ok(mascotaActualizada);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Mascota> obtenerMascota(@PathVariable Long id) {
        return ResponseEntity.ok(mascotaService.obtenerMascotaPorId(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarMascota(@PathVariable Long id) {
        mascotaService.eliminarMascota(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/admin/todas")
    public List<Mascota> obtenerTodasMascotas() {
        return mascotaService.obtenerTodasMascotas();
    }

    @GetMapping("/admin/cantidad")
    public long obtenerCantidadMascotas() {
        return mascotaService.contarMascotas();
    }
}
