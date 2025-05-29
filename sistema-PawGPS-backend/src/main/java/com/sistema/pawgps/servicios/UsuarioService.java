package com.sistema.pawgps.servicios;


import com.sistema.pawgps.modelo.Usuario;
import com.sistema.pawgps.modelo.UsuarioRol;

import java.util.Set;

public interface UsuarioService {

    public Usuario guardarUsuario(Usuario usuario, Set<UsuarioRol> usuarioRoles) throws Exception;

    public Usuario obtenerUsuario(String username);

    public void eliminarUsuario(Long usuarioId);
    public Usuario obtenerUsuarioPorEmail(String email);

}