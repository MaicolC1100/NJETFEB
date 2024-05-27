package com.aplication.jetfeb.service;


import com.aplication.jetfeb.models.Recargo;

import java.util.List;

public interface RecargoServicio {

    List<Recargo> listarTodosLosRecargos();

    Recargo guardarRecargo(Recargo recargo);

    Recargo obtenerRecargoPorId(Integer id);

    Recargo actualizarRecargo(Recargo recargo);

    void eliminarRecargo(Integer id);
}
