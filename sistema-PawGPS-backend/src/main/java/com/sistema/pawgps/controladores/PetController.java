package com.sistema.pawgps.controladores;

import com.sistema.pawgps.DTO.PetDTO;
import com.sistema.pawgps.modelo.Pet;
import com.sistema.pawgps.servicios.PetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/pets")
public class PetController {
    @Autowired
    private PetService petService;

    @PostMapping
    public ResponseEntity<Pet> registerPet(@RequestBody PetDTO petDTO) {
        Pet pet = petService.registerPet(petDTO);
        return ResponseEntity.ok(pet);
    }

    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<List<Pet>> getUserPets(@PathVariable Long usuarioId) {
        List<Pet> pets = petService.getUserPets(usuarioId);
        return ResponseEntity.ok(pets);
    }

    @GetMapping("/count")
    public ResponseEntity<Long> getTotalPets() {
        long count = petService.getTotalPets();
        return ResponseEntity.ok(count);
    }

    @PostMapping("/upload-photo")
    public ResponseEntity<String> uploadPhoto(@RequestParam("photo") MultipartFile file) {
        // Implementación para guardar el archivo y devolver la URL
        String fileUrl = "http://tu-servidor/imagenes/" + file.getOriginalFilename();
        return ResponseEntity.ok(fileUrl);
    }
}
