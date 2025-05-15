package com.sistemaPawGPS.repositorios;

import com.sistemaPawGPS.modelo.Examen;
import com.sistemaPawGPS.modelo.Pregunta;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Set;

public interface PreguntaRepository extends JpaRepository<Pregunta,Long> {

    Set<Pregunta> findByExamen(Examen examen);

}
