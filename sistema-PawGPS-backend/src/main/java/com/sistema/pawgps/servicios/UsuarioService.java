package com.sistema.pawgps.servicios;

import com.sistema.pawgps.modelo.Usuario;
import com.sistema.pawgps.modelo.UsuarioRol;

import java.util.List;
import java.util.Set;

public interface UsuarioService {

    Usuario guardarUsuario(Usuario usuario, Set<UsuarioRol> usuarioRoles) throws Exception;

    Usuario obtenerUsuario(String username);

    void eliminarUsuario(Long usuarioId);

    Usuario obtenerUsuarioPorEmail(String email);

    // Nuevo método añadido
    List<Usuario> obtenerTodosUsuarios();
    Usuario obtenerUsuarioPorId(Long usuarioId);
    Usuario actualizarUsuario(Usuario usuario, Set<UsuarioRol> usuarioRoles);

    Usuario actualizarRolesUsuario(Long usuarioId, Set<UsuarioRol> nuevosRoles);
}