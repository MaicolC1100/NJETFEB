package com.aplication.jetfeb.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.aplication.jetfeb.models.EmpleadoCliente;
import com.aplication.jetfeb.service.EmpleadoClienteServicio;
import java.util.List;

@RestController
@RequestMapping("/api/empleado-cliente")
public class EmpleadoClienteController {

    @Autowired
    private EmpleadoClienteServicio empleadoClienteServicio;

    @GetMapping
    public List<EmpleadoCliente> listarEmpleadosCliente() {
        return empleadoClienteServicio.listarTodosLosEmpleadosCliente();
    }

    @PostMapping
    public void guardarEmpleadoCliente(@RequestBody EmpleadoCliente empleadoCliente) {
        empleadoClienteServicio.guardarEmpleadoCliente(empleadoCliente);
    }

    @GetMapping("/{id}")
    public EmpleadoCliente obtenerEmpleadoClientePorId(@PathVariable Integer id) {
        return empleadoClienteServicio.obtenerEmpleadoClientePorId(id);
    }

    @PutMapping("/{id}")
    public void actualizarEmpleadoCliente(@PathVariable Integer id, @RequestBody EmpleadoCliente empleadoCliente) {
        
        EmpleadoCliente empleadoClienteExistente = empleadoClienteServicio.obtenerEmpleadoClientePorId(id);
        
        if (empleadoClienteExistente != null) {
            
            if (empleadoCliente.getEmpresa() != null) {
                empleadoClienteExistente.setEmpresa(empleadoCliente.getEmpresa());
            }
            if (empleadoCliente.getNombre() != null) {
                empleadoClienteExistente.setNombre(empleadoCliente.getNombre());
            }
            if (empleadoCliente.getApellido() != null) {
                empleadoClienteExistente.setApellido(empleadoCliente.getApellido());
            }
            if (empleadoCliente.getCtroCosto() != null) {
                empleadoClienteExistente.setCtroCosto(empleadoCliente.getCtroCosto());
            }
            if (empleadoCliente.getGerencia() != null) {
                empleadoClienteExistente.setGerencia(empleadoCliente.getGerencia());
            }
            if (empleadoCliente.getCedula() != null) {
                empleadoClienteExistente.setCedula(empleadoCliente.getCedula());
            }
            if (empleadoCliente.getEstado() != null) {
                empleadoClienteExistente.setEstado(empleadoCliente.getEstado());
            }
               
            empleadoClienteServicio.actualizarEmpleadoCliente(empleadoClienteExistente);
        }
    }

    @DeleteMapping("/{id}")
    public void eliminarEmpleadoCliente(@PathVariable Integer id) {
        empleadoClienteServicio.eliminarEmpleadoCliente(id);
    }
}