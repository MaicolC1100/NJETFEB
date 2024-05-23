package com.aplication.jetfeb.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.aplication.jetfeb.Repository.EmpleadoClienteRepository;
import com.aplication.jetfeb.models.EmpleadoCliente;

@Service
public class EmpleadoClienteServicioImpl implements EmpleadoClienteServicio {

    @Autowired
    private EmpleadoClienteRepository repositorio;

    @Override
    public List<EmpleadoCliente> listarTodosLosEmpleadosClientes() {
        return repositorio.findAll();
    }

    @Override
    public EmpleadoCliente guardarEmpleadoCliente(EmpleadoCliente empleadoCliente) {
        return repositorio.save(empleadoCliente);
    }

    @Override
    public EmpleadoCliente obtenerEmpleadoClientePorId(Integer id) {
        return repositorio.findById(id).get();
    }

    @Override
    public EmpleadoCliente actualizarEmpleadoCliente(EmpleadoCliente empleadoCliente) {
        return repositorio.save(empleadoCliente);
    }

    @Override
    public void eliminarEmpleadoCliente(Integer id) {
        repositorio.deleteById(id);
    }
}
