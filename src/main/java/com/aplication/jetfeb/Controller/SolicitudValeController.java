package com.aplication.jetfeb.controller;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.aplication.jetfeb.models.Solicitud_Vale;
import com.aplication.jetfeb.service.SolicitudValeServicio;

import java.util.List;

@RestController
@RequestMapping("/solicitudes_vale")
public class SolicitudValeController {

    private final SolicitudValeServicio solicitudValeServicio;

    @Autowired
    public SolicitudValeController(SolicitudValeServicio solicitudValeServicio) {
        this.solicitudValeServicio = solicitudValeServicio;
    }

    @GetMapping
    public List<Solicitud_Vale> getAllSolicitudVales() {
        return solicitudValeServicio.listarTodasLasSolicitudes();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Solicitud_Vale> getSolicitudValeById(@PathVariable Integer id) {
        Solicitud_Vale solicitudVale = solicitudValeServicio.obtenerSolicitudPorId(id);
        return solicitudVale != null ? ResponseEntity.ok(solicitudVale) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public Solicitud_Vale createSolicitudVale(@RequestBody Solicitud_Vale solicitudVale) {
        return solicitudValeServicio.guardarSolicitud(solicitudVale);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Solicitud_Vale> updateSolicitudVale(@PathVariable Integer id, @RequestBody Solicitud_Vale solicitudValeDetails) {
        Solicitud_Vale solicitudVale = solicitudValeServicio.obtenerSolicitudPorId(id);
        
        if (solicitudVale != null) {
            solicitudVale.setNVale(solicitudValeDetails.getNVale());
            solicitudVale.setUsuario(solicitudValeDetails.getUsuario());
            solicitudVale.setEmpresa(solicitudValeDetails.getEmpresa());
            solicitudVale.setOrigen(solicitudValeDetails.getOrigen());
            solicitudVale.setDestino(solicitudValeDetails.getDestino());
            solicitudVale.setMotivo(solicitudValeDetails.getMotivo());
            solicitudVale.setFechaCreacion(solicitudValeDetails.getFechaCreacion());
            solicitudVale.setFechaAprobacion(solicitudValeDetails.getFechaAprobacion());
            solicitudVale.setFechaServicio(solicitudValeDetails.getFechaServicio());
            solicitudVale.setPasajero1(solicitudValeDetails.getPasajero1());
            solicitudVale.setPasajero2(solicitudValeDetails.getPasajero2());
            solicitudVale.setPasajero3(solicitudValeDetails.getPasajero3());
            solicitudVale.setPasajero4(solicitudValeDetails.getPasajero4());
            
            Solicitud_Vale updatedSolicitudVale = solicitudValeServicio.actualizarSolicitud(solicitudVale);
            return ResponseEntity.ok(updatedSolicitudVale);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSolicitudVale(@PathVariable Integer id) {
        solicitudValeServicio.eliminarSolicitud(id);
        return ResponseEntity.noContent().build();
    }
}
