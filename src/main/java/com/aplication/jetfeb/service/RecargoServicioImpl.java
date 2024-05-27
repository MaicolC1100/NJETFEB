package com.aplication.jetfeb.service;

import com.aplication.jetfeb.models.Recargo;
import com.aplication.jetfeb.repository.RecargoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RecargoServicioImpl implements RecargoServicio {

    @Autowired
    private RecargoRepository recargoRepository;

    @Override
    public List<Recargo> listarTodosLosRecargos() {
        return recargoRepository.findAll();
    }

    @Override
    public Recargo guardarRecargo(Recargo recargo) {
        return recargoRepository.save(recargo);
    }

    @Override
    public Recargo obtenerRecargoPorId(Integer id) {
        Optional<Recargo> optionalRecargo = recargoRepository.findById(id);
        return optionalRecargo.orElse(null);
    }

    @Override
    public Recargo actualizarRecargo(Recargo recargo) {
        return recargoRepository.save(recargo);
    }

    @Override
    public void eliminarRecargo(Integer id) {
        recargoRepository.deleteById(id);
    }
}
