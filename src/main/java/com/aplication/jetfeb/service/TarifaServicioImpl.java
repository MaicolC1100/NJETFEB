package com.aplication.jetfeb.service;

import com.aplication.jetfeb.models.Tarifa;
import com.aplication.jetfeb.repository.TarifaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TarifaServicioImpl implements TarifaServicio {

    @Autowired
    private TarifaRepository tarifaRepository;

    @Override
    public List<Tarifa> listarTodasLasTarifas() {
        return tarifaRepository.findAll();
    }

    @Override
    public Tarifa guardarTarifa(Tarifa tarifa) {
        return tarifaRepository.save(tarifa);
    }

    @Override
    public Tarifa obtenerTarifaPorId(Integer id) {
        Optional<Tarifa> optionalTarifa = tarifaRepository.findById(id);
        return optionalTarifa.orElse(null);
    }

    @Override
    public Tarifa actualizarTarifa(Tarifa tarifa) {
        return tarifaRepository.save(tarifa);
    }

    @Override
    public void eliminarTarifa(Integer id) {
        tarifaRepository.deleteById(id);
    }
}
