package com.aplication.jetfeb.service;

import java.util.List;
import com.aplication.jetfeb.models.Empresa;

public interface EmpresaServicio {

    List<Empresa> listarTodasLasEmpresas();

    Empresa guardarEmpresa(Empresa empresa);

    Empresa obtenerEmpresaPorId(Integer id);

    Empresa actualizarEmpresa(Empresa empresa);

    void eliminarEmpresa(Integer id);
}