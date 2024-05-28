package com.aplication.jetfeb.service;


import com.aplication.jetfeb.models.Solicitud_Vale;
import com.aplication.jetfeb.repository.SolicitudValeRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SolicitudValeServicioImpl implements SolicitudValeServicio {

    @Autowired
    private SolicitudValeRepository solicitudValeRepository;

    @Override
    public List<Solicitud_Vale> listarTodasLasSolicitudes() {
        return solicitudValeRepository.findAll();
    }

    @Override
    public Solicitud_Vale guardarSolicitud(Solicitud_Vale solicitudVale) {
        return solicitudValeRepository.save(solicitudVale);
    }

    @Override
    public Solicitud_Vale obtenerSolicitudPorId(Integer id) {
        return solicitudValeRepository.findById(id).orElse(null);
    }

    @Override
    public Solicitud_Vale actualizarSolicitud(Solicitud_Vale solicitudVale) {
        return solicitudValeRepository.save(solicitudVale);
    }

    @Override
    public void eliminarSolicitud(Integer id) {
        solicitudValeRepository.deleteById(id);
    }
}
