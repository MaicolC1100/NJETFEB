package com.aplication.jetfeb.service;

import java.util.List;

import com.aplication.jetfeb.models.Asignacion_Vale;


public interface AsignacionValeService {

	public List<Asignacion_Vale> listarTodasLasAsignacions();

	public Asignacion_Vale guardarAsignacion(Asignacion_Vale asignacionVale);

	public Asignacion_Vale obtenerAsignacionPorId(Integer id);

	public Asignacion_Vale actualizarAsignacion(Asignacion_Vale asignacionVale);

	public void eliminarAsignacion(Integer id);

}