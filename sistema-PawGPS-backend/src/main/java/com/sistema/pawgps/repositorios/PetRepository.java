package com.sistema.pawgps.repositorios;

import com.sistema.pawgps.modelo.Pet;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PetRepository extends JpaRepository<Pet, Long> {
    List<Pet> findByUsuarioId(Long usuarioId);
    long count();
}