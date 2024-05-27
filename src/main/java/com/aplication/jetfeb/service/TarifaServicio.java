package com.aplication.jetfeb.service;

import com.aplication.jetfeb.models.Tarifa;

import java.util.List;

public interface TarifaServicio {

    List<Tarifa> listarTodasLasTarifas();

    Tarifa guardarTarifa(Tarifa tarifa);

    Tarifa obtenerTarifaPorId(Integer id);

    Tarifa actualizarTarifa(Tarifa tarifa);

    void eliminarTarifa(Integer id);
}
