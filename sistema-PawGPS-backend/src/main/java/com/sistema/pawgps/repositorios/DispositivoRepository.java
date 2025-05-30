package com.sistema.pawgps.repositorios;

import com.sistema.pawgps.modelo.Dispositivo;
import com.sistema.pawgps.modelo.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DispositivoRepository extends JpaRepository<Dispositivo, Long> {
    List<Dispositivo> findByUsuario(Usuario usuario);
    long countByActivoTrue();
}
