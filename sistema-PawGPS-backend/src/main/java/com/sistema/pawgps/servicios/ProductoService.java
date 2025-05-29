package com.sistema.pawgps.servicios;

import com.sistema.pawgps.modelo.Producto;
import com.sistema.pawgps.repositorio.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Service
public class ProductoService {

    @Autowired
    private ProductoRepository productoRepository;

    private static final String UPLOAD_DIR = "uploads/productos/";

    public List<Producto> obtenerTodosProductos() {
        return productoRepository.findAll();
    }

    public Producto obtenerProductoPorId(Long id) {
        return productoRepository.findById(id).orElse(null);
    }

    public Producto guardarProducto(Producto producto, MultipartFile imagen) throws IOException {
        if (imagen != null && !imagen.isEmpty()) {
            String imagenUrl = guardarImagen(imagen);
            producto.setImagenUrl(imagenUrl);
        }
        return productoRepository.save(producto);
    }

    public void eliminarProducto(Long id) {
        productoRepository.deleteById(id);
    }

    private String guardarImagen(MultipartFile imagen) throws IOException {
        byte[] bytes = imagen.getBytes();
        String nombreOriginal = imagen.getOriginalFilename();
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
