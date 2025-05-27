package com.sistema.pawgps.servicios;

import com.sistema.pawgps.DTO.PetDTO;
import com.sistema.pawgps.modelo.Pet;
import com.sistema.pawgps.modelo.Usuario;
import com.sistema.pawgps.repositorios.PetRepository;
import com.sistema.pawgps.repositorios.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
public class PetService {
    @Autowired
    private PetRepository petRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Transactional
    public Pet registerPet(PetDTO petDTO) {
        Usuario usuario = usuarioRepository.findById(petDTO.getUsuarioId())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        Pet pet = new Pet();
        pet.setName(petDTO.getName());
        pet.setBreed(petDTO.getBreed());
        pet.setBirthDate(petDTO.getBirthDate());
        pet.setColor(petDTO.getColor());
        pet.setWeight(petDTO.getWeight());
        pet.setGender(petDTO.getGender());
        pet.setPhotoUrl(petDTO.getPhotoUrl());
        pet.setUsuario(usuario);

        return petRepository.save(pet);
    }

    public List<Pet> getUserPets(Long usuarioId) {
        return petRepository.findByUsuarioId(usuarioId);
    }

    public long getTotalPets() {
        return petRepository.count();
    }
}
