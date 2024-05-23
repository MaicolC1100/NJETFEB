package com.aplication.jetfeb.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.aplication.jetfeb.Repository.EmpleadoClienteRepository;
import com.aplication.jetfeb.models.EmpleadoCliente;
import java.util.List;

@Service
public class EmpleadoClienteServicioImpl implements EmpleadoClienteServicio {

    @Autowired
    private EmpleadoClienteRepository repositorio;

    @Autowired
    private EmpresaServicio empresaServicio;

    @Override
    public List<EmpleadoCliente> listarTodosLosEmpleadosCliente() {
        return repositorio.findAll();
    }

    @Override
    public EmpleadoCliente guardarEmpleadoCliente(EmpleadoCliente empleadoCliente) {
        if (empleadoCliente.getEmpresa() != null && empleadoCliente.getEmpresa().getIdEmpresa() == 0) {
            empleadoCliente.setEmpresa(empresaServicio.guardarEmpresa(empleadoCliente.getEmpresa()));
        }
        return repositorio.save(empleadoCliente);
    }

    @Override
    public EmpleadoCliente obtenerEmpleadoClientePorId(Integer id) {
        return repositorio.findById(id).orElse(null);
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