package com.aplication.jetfeb.controller;

import com.aplication.jetfeb.models.Asignacion_Vale;
import com.aplication.jetfeb.models.Empleado;
import com.aplication.jetfeb.service.AsignacionValeService;
import com.aplication.jetfeb.service.EmpleadoServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/asignacion-vale")
public class AsignacionValeController {

    @Autowired
    private AsignacionValeService asignacionValeService;

    @Autowired
    private EmpleadoServicio empleadoService;

    @GetMapping("/consultar")
    public List<Asignacion_Vale> getAllAsignacionVales() {
        return asignacionValeService.findAll();
    }

    @GetMapping("/consultar/{id}")
    public ResponseEntity<Asignacion_Vale> getAsignacionValeById(@PathVariable int id) {
        Asignacion_Vale asignacionVale = asignacionValeService.findById(id);
        return asignacionVale != null ? ResponseEntity.ok(asignacionVale) : ResponseEntity.notFound().build();
    }

    @PostMapping("/guardar")
    public ResponseEntity<Asignacion_Vale> createAsignacionVale(@RequestBody Asignacion_Vale asignacionVale) {
        // Puedes hacer validaciones o lógica adicional antes de guardar
        Asignacion_Vale nuevaAsignacionVale = asignacionValeService.save(asignacionVale);
        return ResponseEntity.ok(nuevaAsignacionVale);
    }

    @PutMapping("/actualizar/{id}")
    public ResponseEntity<Asignacion_Vale> updateAsignacionVale(@PathVariable int id, @RequestBody Asignacion_Vale asignacionValeDetails) {
        Asignacion_Vale asignacionVale = asignacionValeService.findById(id);
        if (asignacionVale != null) {
            // Actualizar los detalles de la asignación de vale
            asignacionVale.setNVale(asignacionValeDetails.getNVale());
            asignacionVale.setUsuario(asignacionValeDetails.getUsuario());
            // Actualizar otros campos...

            Asignacion_Vale updatedAsignacionVale = asignacionValeService.save(asignacionVale);
            return ResponseEntity.ok(updatedAsignacionVale);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/empleados/{id}")
    public ResponseEntity<Empleado> obtenerEmpleadoPorId(@PathVariable Integer id) {
        Empleado empleado = empleadoService.obtenerEmpleadoporId(id);
        return empleado != null ? ResponseEntity.ok(empleado) : ResponseEntity.notFound().build();
    }
}
