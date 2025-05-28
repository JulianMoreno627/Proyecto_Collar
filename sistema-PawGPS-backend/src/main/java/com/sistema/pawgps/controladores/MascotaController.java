package com.sistema.pawgps.controladores;

import com.sistema.pawgps.modelo.Mascota;
import com.sistema.pawgps.modelo.Usuario;
import com.sistema.pawgps.servicios.MascotaService;
import org.springframework.beans.factory.annotation.Autowired;
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

    @GetMapping("/mis-mascotas")
    public List<Mascota> obtenerMisMascotas() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Usuario usuario = (Usuario) auth.getPrincipal();
        return mascotaService.obtenerMascotasPorUsuario(usuario);
    }

    @PostMapping
    public ResponseEntity<Mascota> registrarMascota(
            @RequestPart("mascota") Mascota mascota,
            @RequestPart(value = "foto", required = false) MultipartFile foto) throws IOException {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Usuario usuario = (Usuario) auth.getPrincipal();

        Mascota mascotaGuardada = mascotaService.guardarMascota(mascota, usuario, foto);
        return ResponseEntity.ok(mascotaGuardada);
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