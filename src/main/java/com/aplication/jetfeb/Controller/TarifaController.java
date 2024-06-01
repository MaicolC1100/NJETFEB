package com.aplication.jetfeb.controller;

import com.aplication.jetfeb.models.Tarifa;
import com.aplication.jetfeb.service.TarifaServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tarifa")
public class TarifaController {

    @Autowired
    private TarifaServicio tarifaServicio;

    @GetMapping("/consultar")
    public ResponseEntity<List<Tarifa>> listarTarifas() {
        List<Tarifa> tarifas = tarifaServicio.listarTodasLasTarifas();
        return new ResponseEntity<>(tarifas, HttpStatus.OK);
    }

    @GetMapping("/consultar/{id}")
    public ResponseEntity<Tarifa> obtenerTarifa(@PathVariable("id") Integer id) {
        Tarifa tarifa = tarifaServicio.obtenerTarifaPorId(id);
        if (tarifa == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(tarifa, HttpStatus.OK);
    }

    @PostMapping("/guardar")
    public ResponseEntity<Tarifa> crearTarifa(@RequestBody Tarifa tarifa) {
        Tarifa nuevaTarifa = tarifaServicio.guardarTarifa(tarifa);
        return new ResponseEntity<>(nuevaTarifa, HttpStatus.CREATED);
    }

    @PutMapping("/actualizar/{id}")
    public ResponseEntity<Tarifa> actualizarTarifa(@PathVariable("id") Integer id, @RequestBody Tarifa tarifa) {
        Tarifa tarifaExistente = tarifaServicio.obtenerTarifaPorId(id);
        if (tarifaExistente == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        tarifa.setIdTarifa(id); // Asegurando que el ID sea el mismo que el de la tarifa existente
        Tarifa tarifaActualizada = tarifaServicio.actualizarTarifa(tarifa);
        return new ResponseEntity<>(tarifaActualizada, HttpStatus.OK);
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<Void> eliminarTarifa(@PathVariable("id") Integer id) {
        Tarifa tarifa = tarifaServicio.obtenerTarifaPorId(id);
        if (tarifa == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        tarifaServicio.eliminarTarifa(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
