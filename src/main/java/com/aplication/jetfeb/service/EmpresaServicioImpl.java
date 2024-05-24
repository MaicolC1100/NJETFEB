package com.aplication.jetfeb.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aplication.jetfeb.models.Empresa;
import com.aplication.jetfeb.repository.EmpresaRepository;

import java.util.List;

@Service
public class EmpresaServicioImpl implements EmpresaServicio {

    @Autowired
    private EmpresaRepository empresaRepository;

    @Override
    public List<Empresa> listarTodasLasEmpresas() {
        return empresaRepository.findAll();
    }

    @Override
    public Empresa guardarEmpresa(Empresa empresa) {
        return empresaRepository.save(empresa);
    }

    @Override
    public Empresa obtenerEmpresaPorId(Integer id) {
        return empresaRepository.findById(id).orElse(null);
    }

    @Override
    public Empresa actualizarEmpresa(Empresa empresa) {
        return empresaRepository.save(empresa);
    }

    @Override
    public void eliminarEmpresa(Integer id) {
        empresaRepository.deleteById(id);
    }
}