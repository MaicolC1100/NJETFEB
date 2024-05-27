package com.aplication.jetfeb.controller;

import com.aplication.jetfeb.models.Recargo;
import com.aplication.jetfeb.service.RecargoServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/recargos")
public class RecargoController {

    @Autowired
    private RecargoServicio recargoServicio;

    @GetMapping
    public ResponseEntity<List<Recargo>> listarRecargos() {
        List<Recargo> recargos = recargoServicio.listarTodosLosRecargos();
        return new ResponseEntity<>(recargos, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Recargo> obtenerRecargo(@PathVariable("id") Integer id) {
        Recargo recargo = recargoServicio.obtenerRecargoPorId(id);
        if (recargo == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(recargo, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Recargo> crearRecargo(@RequestBody Recargo recargo) {
        Recargo nuevoRecargo = recargoServicio.guardarRecargo(recargo);
        return new ResponseEntity<>(nuevoRecargo, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Recargo> actualizarRecargo(@PathVariable("id") Integer id, @RequestBody Recargo recargo) {
        Recargo recargoExistente = recargoServicio.obtenerRecargoPorId(id);
        if (recargoExistente == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        recargo.setIdRecargo(id); // Asegurando que el ID sea el mismo que el del recargo existente
        Recargo recargoActualizado = recargoServicio.actualizarRecargo(recargo);
        return new ResponseEntity<>(recargoActualizado, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarRecargo(@PathVariable("id") Integer id) {
        Recargo recargo = recargoServicio.obtenerRecargoPorId(id);
        if (recargo == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        recargoServicio.eliminarRecargo(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
