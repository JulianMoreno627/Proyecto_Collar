package com.sistema.pawgps.servicios;

import com.sistema.pawgps.modelo.Mascota;
import com.sistema.pawgps.modelo.Usuario;
import com.sistema.pawgps.repositorios.MascotaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Service
public class MascotaService {

    @Autowired
    private MascotaRepository mascotaRepository;

    private static final String UPLOAD_DIR = "uploads/mascotas/";

    public List<Mascota> obtenerMascotasPorUsuario(Usuario usuario) {
        return mascotaRepository.findByUsuario(usuario);
    }

    public Mascota guardarMascota(Mascota mascota, Usuario usuario, MultipartFile foto) throws IOException {
        mascota.setUsuario(usuario);

        if (foto != null && !foto.isEmpty()) {
            String fotoUrl = guardarFoto(foto);
            mascota.setFotoUrl(fotoUrl);
        }

        return mascotaRepository.save(mascota);
    }

    public List<Mascota> obtenerTodasMascotas() {
        return mascotaRepository.findAll();
    }

    public long contarMascotas() {
        return mascotaRepository.count();
    }

    private String guardarFoto(MultipartFile foto) throws IOException {
        byte[] bytes = foto.getBytes();
        String nombreOriginal = foto.getOriginalFilename();
        String extension = nombreOriginal.substring(nombreOriginal.lastIndexOf("."));
        String nuevoNombre = System.currentTimeMillis() + extension;

        Path directorio = Paths.get(UPLOAD_DIR);
        if (!Files.exists(directorio)) {
            Files.createDirectories(directorio);
        }

        Path rutaCompleta = directorio.resolve(nuevoNombre);
        Files.write(rutaCompleta, bytes);

        return "/" + UPLOAD_DIR + nuevoNombre;
    }
}
