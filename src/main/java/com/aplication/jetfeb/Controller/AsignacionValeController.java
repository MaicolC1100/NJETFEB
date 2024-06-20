package com.aplication.jetfeb.controller;

import com.aplication.jetfeb.models.Asignacion_Vale;
import com.aplication.jetfeb.models.Empleado;
import com.aplication.jetfeb.models.Solicitud_Vale;
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
        return asignacionValeService.listarTodasLasAsignacions();
    }

    @GetMapping("/consultar/{id}")
    public ResponseEntity<Asignacion_Vale> getAsignacionValeById(@PathVariable int id) {
        Asignacion_Vale asignacionVale = asignacionValeService.obtenerAsignacionPorId(id);
        return asignacionVale != null ? ResponseEntity.ok(asignacionVale) : ResponseEntity.notFound().build();
    }

    @PostMapping("/guardar")
    public Asignacion_Vale createAsignacionVale(@RequestBody Asignacion_Vale asignacion_Vale) {
        return asignacionValeService.guardarAsignacion(asignacion_Vale);
    }

    @PutMapping("/actualizar/{id}")
    public ResponseEntity<Asignacion_Vale> updateAsignacionVale(@PathVariable int id, @RequestBody Asignacion_Vale asignacionValeDetails) {
        Asignacion_Vale asignacionVale = asignacionValeService.obtenerAsignacionPorId(id);
       
        if (asignacionVale != null) {
           // Actualizar los campos del Asignacion_Vale
            asignacionVale.setN_vale(asignacionValeDetails.getN_vale());
            asignacionVale.setUsuario(asignacionValeDetails.getUsuario());
            asignacionVale.setEmpresa(asignacionValeDetails.getEmpresa());
            asignacionVale.setEmpleado(asignacionValeDetails.getEmpleado());
            asignacionVale.setPlaca(asignacionValeDetails.getPlaca());
            asignacionVale.setCedula(asignacionValeDetails.getCedula());
            asignacionVale.setOrigen(asignacionValeDetails.getOrigen());
            asignacionVale.setDestino(asignacionValeDetails.getDestino());
            asignacionVale.setMotivo(asignacionValeDetails.getMotivo());
            asignacionVale.setValorVale(asignacionValeDetails.getValorVale());
            asignacionVale.setFechaCreacion(asignacionValeDetails.getFechaCreacion());
            asignacionVale.setFechaAprobacion(asignacionValeDetails.getFechaAprobacion());
            asignacionVale.setFechaServicio(asignacionValeDetails.getFechaServicio());
            asignacionVale.setPasajero1(asignacionValeDetails.getPasajero1());
            asignacionVale.setPasajero2(asignacionValeDetails.getPasajero2());
            asignacionVale.setPasajero3(asignacionValeDetails.getPasajero3());
            asignacionVale.setPasajero4(asignacionValeDetails.getPasajero4());

        
			Asignacion_Vale updatedAsignacionVale = asignacionValeService.actualizarAsignacion(asignacionVale);

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
