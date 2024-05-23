package com.aplication.jetfeb.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.aplication.jetfeb.models.Empresa;
import com.aplication.jetfeb.service.EmpresaServicio;
import java.util.List;

@RestController
@RequestMapping("/api/empresa")
public class EmpresaController {

    @Autowired
    private EmpresaServicio empresaServicio;

    @GetMapping
    public List<Empresa> listarEmpresas() {
        return empresaServicio.listarTodasLasEmpresas();
    }
}