package com.aplication.jetfeb.service;

import com.aplication.jetfeb.models.Solicitud_Vale;
import java.util.List;

public interface SolicitudValeServicio {

	public List<Solicitud_Vale> listarTodasLasSolicitudes();

	public Solicitud_Vale guardarSolicitud(Solicitud_Vale solicitudVale);

	public Solicitud_Vale obtenerSolicitudPorId(Integer id);

	public Solicitud_Vale actualizarSolicitud(Solicitud_Vale solicitudVale);

	public void eliminarSolicitud(Integer id);

}
