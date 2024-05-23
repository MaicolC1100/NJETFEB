package com.aplication.jetfeb.service;

import java.util.List;
import com.aplication.jetfeb.models.EmpleadoCliente;

public interface EmpleadoClienteServicio {

    public List<EmpleadoCliente> listarTodosLosEmpleadosClientes();

    public EmpleadoCliente guardarEmpleadoCliente(EmpleadoCliente empleadoCliente);

    public EmpleadoCliente obtenerEmpleadoClientePorId(Integer id);

    public EmpleadoCliente actualizarEmpleadoCliente(EmpleadoCliente empleadoCliente);

    public void eliminarEmpleadoCliente(Integer id);

}
