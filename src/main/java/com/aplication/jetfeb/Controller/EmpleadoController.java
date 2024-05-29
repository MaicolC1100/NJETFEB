package com.aplication.jetfeb.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.aplication.jetfeb.models.Empleado;
import com.aplication.jetfeb.service.EmpleadoServicio;

@RestController
@RequestMapping("/api/empleado")
public class EmpleadoController {

    @Autowired
    private EmpleadoServicio empleadoServicio;

    @GetMapping
    public List<Empleado> listarEmpleados() {
        return empleadoServicio.listartodolosempleados();
    }

    @PostMapping
    public void guardarEmpleado(@RequestBody Empleado empleado) {
        empleadoServicio.guardarEmpleado(empleado);
    }

    @GetMapping("/{id}")
    public Empleado obtenerEmpleadoPorId(@PathVariable Integer id) {
         return empleadoServicio.obtenerEmpleadoporId(id);
    }

    @PutMapping("/{id}")
    public void actualizarEmpleado(@PathVariable Integer id, @RequestBody Empleado empleado) {
        Empleado empleadoExistente = empleadoServicio.obtenerEmpleadoporId(id);
        
        if (empleadoExistente != null) {
            
            if (empleado.getCedula() != null) {
                empleadoExistente.setCedula(empleado.getCedula());
            }
            if (empleado.getNombre() != null) {
                empleadoExistente.setNombre(empleado.getNombre());
            }
            if (empleado.getApellido() != null) {
                empleadoExistente.setApellido(empleado.getApellido());
            }
            if (empleado.getCargo() != null) {
                empleadoExistente.setCargo(empleado.getCargo());
            }
            if (empleado.getCelular() != null) {
                empleadoExistente.setCelular(empleado.getCelular());
            }
            if (empleado.getCorreo() != null) {
                empleadoExistente.setCorreo(empleado.getCorreo());
            }
            if (empleado.getPlaca() != null) {
                empleadoExistente.setPlaca(empleado.getPlaca());
            }
            if (empleado.getEstado() != null) {
                empleadoExistente.setEstado(empleado.getEstado());
            }
        
            empleadoServicio.actualizarEmpleado(empleadoExistente);
        }
                
    }

    @DeleteMapping("/{id}")
    public void eliminarEmpleado(@PathVariable Integer id) {
        empleadoServicio.eliminarEmpleado(id);
    }
}
