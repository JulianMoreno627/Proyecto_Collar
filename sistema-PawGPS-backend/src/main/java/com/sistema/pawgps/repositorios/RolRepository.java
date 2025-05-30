package com.sistema.pawgps.repositorios;

import com.sistema.pawgps.modelo.Rol;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RolRepository extends JpaRepository<Rol, Long> {
    Rol findByRolNombre(String rolNombre);
}
