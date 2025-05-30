package com.sistema.pawgps.servicios;


import com.sistema.pawgps.modelo.Dispositivo;
import com.sistema.pawgps.modelo.Usuario;
import com.sistema.pawgps.repositorios.DispositivoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DispositivoService {

    @Autowired
    private DispositivoRepository dispositivoRepository;

    public List<Dispositivo> obtenerTodosDispositivos() {
        return dispositivoRepository.findAll();
    }

    public List<Dispositivo> obtenerDispositivosPorUsuario(Usuario usuario) {
        return dispositivoRepository.findByUsuario(usuario);
    }

    public Dispositivo obtenerDispositivoPorId(Long id) {
        return dispositivoRepository.findById(id).orElse(null);
    }

    public Dispositivo guardarDispositivo(Dispositivo dispositivo) {
        return dispositivoRepository.save(dispositivo);
    }

    public void eliminarDispositivo(Long id) {
        dispositivoRepository.deleteById(id);
    }

    public long contarDispositivosActivos() {
        return dispositivoRepository.countByActivoTrue();
    }
}
