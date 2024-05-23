package com.aplication.jetfeb.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import com.aplication.jetfeb.models.Empleado;
import com.aplication.jetfeb.service.EmpleadoServicio;
import java.util.List;

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
        empleadoExistente.setIdEmpleado(id);
        empleadoExistente.setCedula(empleado.getCedula());
        empleadoExistente.setPlaca(empleado.getPlaca());
        empleadoExistente.setCargo(empleado.getCargo());
        empleadoExistente.setCelular(empleado.getCelular());
        empleadoExistente.setCorreo(empleado.getCorreo());

        empleadoServicio.actualizarEmpleado(empleadoExistente);
    }

    @DeleteMapping("/{id}")
    public void eliminarEmpleado(@PathVariable Integer id) {
        empleadoServicio.eliminarEmpleado(id);
    }
}
