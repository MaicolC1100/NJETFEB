package com.aplication.jetfeb.service;

import java.util.List;

import com.aplication.jetfeb.models.Asignacion_Vale;

public interface AsignacionValeService {

	List<Asignacion_Vale> findAll();

	Asignacion_Vale findById(int id);

	Asignacion_Vale save(Asignacion_Vale asignacionVale);

	void deleteById(int id);

}
