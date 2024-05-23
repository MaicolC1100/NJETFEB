package com.aplication.jetfeb.service;

import java.util.List;
import com.aplication.jetfeb.models.EmpleadoCliente;

public interface EmpleadoClienteServicio {

    List<EmpleadoCliente> listarTodosLosEmpleadosCliente();

    EmpleadoCliente guardarEmpleadoCliente(EmpleadoCliente empleadoCliente);

    EmpleadoCliente obtenerEmpleadoClientePorId(Integer id);

    EmpleadoCliente actualizarEmpleadoCliente(EmpleadoCliente empleadoCliente);

    void eliminarEmpleadoCliente(Integer id);
}