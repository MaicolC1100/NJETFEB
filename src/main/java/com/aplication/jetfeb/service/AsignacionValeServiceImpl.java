package com.aplication.jetfeb.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aplication.jetfeb.models.Asignacion_Vale;
import com.aplication.jetfeb.repository.AsignacionValeRepository;


import java.util.List;

@Service
public class AsignacionValeServiceImpl implements AsignacionValeService {

    @Autowired
    private AsignacionValeRepository asignacionValeRepository;
	
	@Override
	public List<Asignacion_Vale> listarTodasLasAsignacions() {
		return asignacionValeRepository.findAll();
	}

	@Override
	public Asignacion_Vale guardarAsignacion(Asignacion_Vale asignacionVale) {
		return asignacionValeRepository.save(asignacionVale);
	}

	@Override
	public Asignacion_Vale obtenerAsignacionPorId(Integer id) {
		return asignacionValeRepository.findById(id).orElse(null);
	}

	@Override
	public Asignacion_Vale actualizarAsignacion(Asignacion_Vale asignacionVale) {
		return asignacionValeRepository.save(asignacionVale);
	}

	@Override
	public void eliminarAsignacion(Integer id) {
		asignacionValeRepository.deleteById(id);
	}

  
}
