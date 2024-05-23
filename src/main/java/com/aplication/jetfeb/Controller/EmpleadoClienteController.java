package com.aplication.jetfeb.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
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
    public List<EmpleadoCliente> listarEmpleadosClientes() {
        return empleadoClienteServicio.listarTodosLosEmpleadosClientes();
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
        empleadoClienteExistente.setIdEmpleadoCliente(id);
        empleadoClienteExistente.setNombre(empleadoCliente.getNombre());
        empleadoClienteExistente.setCedula(empleadoCliente.getCedula());
        empleadoClienteExistente.setCtroCosto(empleadoCliente.getCtroCosto());
        empleadoClienteExistente.setGerencia(empleadoCliente.getGerencia());
        empleadoClienteExistente.setEmpresa(empleadoCliente.getEmpresa());
        empleadoClienteExistente.setEstado(empleadoCliente.isEstado());

        empleadoClienteServicio.actualizarEmpleadoCliente(empleadoClienteExistente);
    }

    @DeleteMapping("/{id}")
    public void eliminarEmpleadoCliente(@PathVariable Integer id) {
        empleadoClienteServicio.eliminarEmpleadoCliente(id);
    }
}
