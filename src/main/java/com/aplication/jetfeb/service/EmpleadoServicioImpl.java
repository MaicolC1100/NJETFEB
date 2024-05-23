package com.aplication.jetfeb.service;



import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aplication.jetfeb.Repository.EmpleadoRepository;
import com.aplication.jetfeb.models.Empleado;


@Service
public class EmpleadoServicioImpl implements EmpleadoServicio { 
	
	@Autowired
	private EmpleadoRepository repositorio;

	@Override
	public List<Empleado> listartodolosempleados() {
	    return repositorio.findAll();
    }

	@Override
	public Empleado guardarEmpleado(Empleado empleado) {
		return repositorio.save(empleado);
	}


	@Override
	public Empleado obtenerEmpleadoporId(Integer id) {
		return repositorio.findById(id).get();
	}

	@Override
	public Empleado actualizarEmpleado(Empleado empleado) {
		return repositorio.save(empleado);
	}

	@Override
	public void eliminarEmpleado(Integer id) {
		repositorio.deleteById(id);
	}
	


}
