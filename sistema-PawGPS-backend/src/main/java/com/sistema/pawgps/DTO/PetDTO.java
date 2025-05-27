package com.sistema.pawgps.DTO;

import java.time.LocalDate;

public class PetDTO {
    private String name;
    private String breed;
    private LocalDate birthDate;
    private String color;
    private Double weight;
    private String gender;
    private String photoUrl;
    private Long usuarioId;

    // Getters y Setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getBreed() { return breed; }
    public void setBreed(String breed) { this.breed = breed; }
    public LocalDate getBirthDate() { return birthDate; }
    public void setBirthDate(LocalDate birthDate) { this.birthDate = birthDate; }
    public String getColor() { return color; }
    public void setColor(String color) { this.color = color; }
    public Double getWeight() { return weight; }
    public void setWeight(Double weight) { this.weight = weight; }
    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }
    public String getPhotoUrl() { return photoUrl; }
    public void setPhotoUrl(String photoUrl) { this.photoUrl = photoUrl; }
    public Long getUsuarioId() { return usuarioId; }
    public void setUsuarioId(Long usuarioId) { this.usuarioId = usuarioId; }
}

