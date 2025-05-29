package com.sistema.pawgps.repositorios;

import com.sistema.pawgps.modelo.Dispositivo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DispositivoRepository extends JpaRepository<Dispositivo, Long> {
    long count();
}