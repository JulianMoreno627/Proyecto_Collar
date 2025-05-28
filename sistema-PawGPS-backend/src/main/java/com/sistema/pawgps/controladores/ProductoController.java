// src/main/java/com/sistema/pawgps/controladores/ProductoController.java
package com.sistema.pawgps.controladores;

import com.sistema.pawgps.modelo.Producto;
import com.sistema.pawgps.servicios.ProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/productos")
public class ProductoController {

    @Autowired
    private ProductoService productoService;

    @GetMapping
    public List<Producto> obtenerTodosProductos() {
        return productoService.obtenerTodosProductos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Producto> obtenerProductoPorId(@PathVariable Long id) {
        Producto producto = productoService.obtenerProductoPorId(id);
        return producto != null ? ResponseEntity.ok(producto) : ResponseEntity.notFound().build();
    }

    @PostMapping
    @Secured("ROLE_ADMIN")
    public ResponseEntity<Producto> crearProducto(
            @RequestPart("producto") Producto producto,
            @RequestPart(value = "imagen", required = false) MultipartFile imagen) throws IOException {
        Producto nuevoProducto = productoService.guardarProducto(producto, imagen);
        return ResponseEntity.ok(nuevoProducto);
    }

    @PutMapping("/{id}")
    @Secured("ROLE_ADMIN")
    public ResponseEntity<Producto> actualizarProducto(
            @PathVariable Long id,
            @RequestPart("producto") Producto producto,
            @RequestPart(value = "imagen", required = false) MultipartFile imagen) throws IOException {
        producto.setId(id);
        Producto productoActualizado = productoService.guardarProducto(producto, imagen);
        return ResponseEntity.ok(productoActualizado);
    }

    @DeleteMapping("/{id}")
    @Secured("ROLE_ADMIN")
    public ResponseEntity<Void> eliminarProducto(@PathVariable Long id) {
        productoService.eliminarProducto(id);
        return ResponseEntity.noContent().build();
    }
}