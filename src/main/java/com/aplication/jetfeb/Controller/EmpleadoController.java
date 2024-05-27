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
            empleadoExistente.setCedula(empleado.getCedula());
            empleadoExistente.setNombre(empleado.getNombre());
            empleadoExistente.setApellido(empleado.getApellido());
            empleadoExistente.setCargo(empleado.getCargo());
            empleadoExistente.setCelular(empleado.getCelular());
            empleadoExistente.setCorreo(empleado.getCorreo());
            empleadoExistente.setPlaca(empleado.getPlaca());
            empleadoExistente.setEstado(empleado.getEstado());

            empleadoServicio.actualizarEmpleado(empleadoExistente);
        }        
    }

    @DeleteMapping("/{id}")
    public void eliminarEmpleado(@PathVariable Integer id) {
        empleadoServicio.eliminarEmpleado(id);
    }
}
