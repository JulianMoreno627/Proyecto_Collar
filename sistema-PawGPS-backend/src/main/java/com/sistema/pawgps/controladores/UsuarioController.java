package com.sistema.pawgps.controladores;

import com.sistema.pawgps.modelo.Rol;
import com.sistema.pawgps.modelo.Usuario;
import com.sistema.pawgps.modelo.UsuarioRol;
import com.sistema.pawgps.repositorios.RolRepository;
import com.sistema.pawgps.servicios.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/usuarios")
@CrossOrigin("*")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private RolRepository rolRepository;

    // Endpoint para obtener todos los usuarios (solo ADMIN)
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/admin/todos")
    public List<Usuario> obtenerTodosUsuarios() {
        return usuarioService.obtenerTodosUsuarios();
    }

    // Endpoint para crear usuario (con opción de crear ADMIN)
    @PostMapping("/")
    public Usuario guardarUsuario(
            @RequestBody Usuario usuario,
            @RequestParam(required = false, defaultValue = "false") boolean esAdmin) throws Exception {

        usuario.setPerfil("default.png");
        usuario.setPassword(this.bCryptPasswordEncoder.encode(usuario.getPassword()));

        // Determinar el rol según el parámetro
        String nombreRol = esAdmin ? "ADMIN" : "NORMAL";
        Rol rol = rolRepository.findByRolNombre(nombreRol);

        if (rol == null) {
            rol = new Rol();
            rol.setRolNombre(nombreRol);
            rol = rolRepository.save(rol);
        }

        UsuarioRol usuarioRol = new UsuarioRol();
        usuarioRol.setUsuario(usuario);
        usuarioRol.setRol(rol);

        Set<UsuarioRol> usuarioRoles = new HashSet<>();
        usuarioRoles.add(usuarioRol);

        return usuarioService.guardarUsuario(usuario, usuarioRoles);
    }

    // Endpoint para obtener usuario por username
    @GetMapping("/{username}")
    public Usuario obtenerUsuario(@PathVariable("username") String username) {
        return usuarioService.obtenerUsuario(username);
    }

    // Endpoint para eliminar usuario (solo ADMIN)
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{usuarioId}")
    public void eliminarUsuario(@PathVariable("usuarioId") Long usuarioId) {
        usuarioService.eliminarUsuario(usuarioId);
    }

    // Endpoint para obtener usuario por email
    @GetMapping("/email/{email}")
    public Usuario obtenerUsuarioPorEmail(@PathVariable String email) {
        return usuarioService.obtenerUsuarioPorEmail(email);
    }

    // Nuevo endpoint para actualizar usuario a ADMIN (solo ADMIN)
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{usuarioId}/hacer-admin")
    public Usuario hacerAdmin(@PathVariable Long usuarioId) throws Exception {
        Usuario usuario = usuarioService.obtenerUsuarioPorId(usuarioId);
        Rol rolAdmin = rolRepository.findByRolNombre("ADMIN");

        if (rolAdmin == null) {
            rolAdmin = new Rol();
            rolAdmin.setRolNombre("ADMIN");
            rolAdmin = rolRepository.save(rolAdmin);
        }

        UsuarioRol usuarioRol = new UsuarioRol();
        usuarioRol.setUsuario(usuario);
        usuarioRol.setRol(rolAdmin);

        Set<UsuarioRol> usuarioRoles = new HashSet<>(usuario.getUsuarioRoles());
        usuarioRoles.add(usuarioRol);

        return usuarioService.actualizarUsuario(usuario, usuarioRoles);
    }
}
