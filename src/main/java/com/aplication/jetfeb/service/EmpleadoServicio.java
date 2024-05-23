package com.aplication.jetfeb.service;

import java.util.List;

import com.aplication.jetfeb.models.Empleado;

public interface EmpleadoServicio {

	public List<Empleado> listartodolosempleados();

	public Empleado guardarEmpleado(Empleado empleado);

	public Empleado obtenerEmpleadoporId(Integer id);

	public Empleado actualizarEmpleado(Empleado empleado);

	public void eliminarEmpleado(Integer id);

}
