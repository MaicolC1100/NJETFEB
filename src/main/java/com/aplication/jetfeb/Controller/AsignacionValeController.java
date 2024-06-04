package com.aplication.jetfeb.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.aplication.jetfeb.models.Asignacion_Vale;
import com.aplication.jetfeb.service.AsignacionValeService;

import java.util.List;

@RestController
@RequestMapping("/api/asignacion_vale")
public class AsignacionValeController {

    @Autowired
    private AsignacionValeService asignacionValeService;

    @GetMapping
    public List<Asignacion_Vale> getAllAsignacionVales() {
        return asignacionValeService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Asignacion_Vale> getAsignacionValeById(@PathVariable int id) {
    	Asignacion_Vale asignacionVale = asignacionValeService.findById(id);
        if (asignacionVale != null) {
            return ResponseEntity.ok(asignacionVale);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public Asignacion_Vale createAsignacionVale(@RequestBody Asignacion_Vale asignacionVale) {
        return asignacionValeService.save(asignacionVale);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Asignacion_Vale> updateAsignacionVale(@PathVariable int id, @RequestBody Asignacion_Vale asignacionValeDetails) {
    	Asignacion_Vale asignacionVale = asignacionValeService.findById(id);
        if (asignacionVale != null) {
            asignacionVale.setNVale(asignacionValeDetails.getNVale());
            asignacionVale.setUsuario(asignacionValeDetails.getUsuario());
            asignacionVale.setEmpresa(asignacionValeDetails.getEmpresa());
            asignacionVale.setEmpleado(asignacionValeDetails.getEmpleado());
            asignacionVale.setPlaca(asignacionValeDetails.getPlaca());
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

            Asignacion_Vale updatedAsignacionVale = asignacionValeService.save(asignacionVale);
            return ResponseEntity.ok(updatedAsignacionVale);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAsignacionVale(@PathVariable int id) {
    	Asignacion_Vale asignacionVale = asignacionValeService.findById(id);
        if (asignacionVale != null) {
            asignacionValeService.deleteById(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
