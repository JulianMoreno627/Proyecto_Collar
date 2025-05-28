package com.sistema.pawgps.repositorios;

import com.sistema.pawgps.modelo.Mascota;
import com.sistema.pawgps.modelo.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MascotaRepository extends JpaRepository<Mascota, Long> {
    List<Mascota> findByUsuario(Usuario usuario);
    long count();
}