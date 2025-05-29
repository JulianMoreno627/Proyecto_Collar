package com.sistema.pawgps.servicios;

import com.sistema.pawgps.modelo.Dispositivo;
import com.sistema.pawgps.repositorios.DispositivoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DispositivoService {

    @Autowired
    private DispositivoRepository dispositivoRepository;

    // Método existente
    public List<Dispositivo> obtenerTodosDispositivos() {
        return dispositivoRepository.findAll();
    }

    // Método existente
    public long contarDispositivos() {
        return dispositivoRepository.count();
    }

    // Método existente
    public void eliminarDispositivo(Long id) {
        dispositivoRepository.deleteById(id);
    }

    // Nuevo método para obtener dispositivo por ID
    public Dispositivo obtenerDispositivoPorId(Long id) {
        Optional<Dispositivo> dispositivo = dispositivoRepository.findById(id);
        return dispositivo.orElseThrow(() -> new RuntimeException("Dispositivo no encontrado con ID: " + id));
    }
}