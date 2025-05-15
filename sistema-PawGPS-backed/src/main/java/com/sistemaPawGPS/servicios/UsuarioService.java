package com.sistemaPawGPS.servicios;

import com.sistemaPawGPS.modelo.Usuario;
import com.sistemaPawGPS.modelo.UsuarioRol;

import java.util.Set;

public interface UsuarioService {

    public Usuario guardarUsuario(Usuario usuario, Set<UsuarioRol> usuarioRoles) throws Exception;

    public Usuario obtenerUsuario(String username);

    public void eliminarUsuario(Long usuarioId);
}
