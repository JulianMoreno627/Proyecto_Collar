package com.sistema.pawgps.servicios.impl;

import com.sistema.pawgps.modelo.Usuario;
import com.sistema.pawgps.modelo.UsuarioRol;
import com.sistema.pawgps.repositorios.RolRepository;
import com.sistema.pawgps.repositorios.UsuarioRepository;
import com.sistema.pawgps.servicios.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public class UsuarioServiceImpl implements UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private RolRepository rolRepository;

    @Override
    public Usuario guardarUsuario(Usuario usuario, Set<UsuarioRol> usuarioRoles) throws Exception {
        Usuario usuarioExistente = usuarioRepository.findByUsername(usuario.getUsername());
        if (usuarioExistente != null) {
            throw new Exception("El usuario ya está registrado");
        }

        // Guardar roles asociados
        for (UsuarioRol usuarioRol : usuarioRoles) {
            rolRepository.save(usuarioRol.getRol());
        }

        usuario.getUsuarioRoles().addAll(usuarioRoles);
        return usuarioRepository.save(usuario);
    }

    @Override
    public Usuario obtenerUsuario(String username) {
        return usuarioRepository.findByUsername(username);
    }

    @Override
    public Usuario obtenerUsuarioPorId(Long usuarioId) {
        return usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con ID: " + usuarioId));
    }

    @Override
    public void eliminarUsuario(Long usuarioId) {
        usuarioRepository.deleteById(usuarioId);
    }

    @Override
    public Usuario obtenerUsuarioPorEmail(String email) {
        return usuarioRepository.findByEmail(email);
    }

    @Override
    public List<Usuario> obtenerTodosUsuarios() {
        return usuarioRepository.findAll();
    }

    @Override
    public Usuario actualizarUsuario(Usuario usuario, Set<UsuarioRol> usuarioRoles) {
        // Verificar si el usuario existe
        Usuario usuarioExistente = usuarioRepository.findById(usuario.getId())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        // Actualizar roles
        usuarioExistente.getUsuarioRoles().clear();
        for (UsuarioRol usuarioRol : usuarioRoles) {
            rolRepository.save(usuarioRol.getRol());
            usuarioExistente.getUsuarioRoles().add(usuarioRol);
        }

        // Actualizar datos básicos
        usuarioExistente.setUsername(usuario.getUsername());
        usuarioExistente.setPassword(usuario.getPassword());
        usuarioExistente.setNombre(usuario.getNombre());
        usuarioExistente.setApellido(usuario.getApellido());
        usuarioExistente.setEmail(usuario.getEmail());
        usuarioExistente.setTelefono(usuario.getTelefono());
        usuarioExistente.setPerfil(usuario.getPerfil());
        usuarioExistente.setEnabled(usuario.isEnabled());

        return usuarioRepository.save(usuarioExistente);
    }

    @Override
    public Usuario actualizarRolesUsuario(Long usuarioId, Set<UsuarioRol> nuevosRoles) {
        Usuario usuario = obtenerUsuarioPorId(usuarioId);

        // Eliminar roles existentes
        usuario.getUsuarioRoles().clear();

        // Añadir nuevos roles
        for (UsuarioRol usuarioRol : nuevosRoles) {
            rolRepository.save(usuarioRol.getRol());
            usuario.getUsuarioRoles().add(usuarioRol);
        }

        return usuarioRepository.save(usuario);
    }
}
