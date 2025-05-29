package com.sistema.pawgps.repositorios;

import com.sistema.pawgps.modelo.Ubicacion;
import com.sistema.pawgps.modelo.Dispositivo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UbicacionRepository extends JpaRepository<Ubicacion, Long> {
    List<Ubicacion> findByDispositivoOrderByFechaHoraDesc(Dispositivo dispositivo);
    Ubicacion findFirstByDispositivoOrderByFechaHoraDesc(Dispositivo dispositivo);
}
