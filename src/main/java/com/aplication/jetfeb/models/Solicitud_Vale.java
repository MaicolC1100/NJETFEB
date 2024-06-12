package com.aplication.jetfeb.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@Entity
@Table(name = "solicitud_vale")
public class Solicitud_Vale {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_solicitud_vale", nullable = false)
    private int idSolicitudVale;

    @Column(name = "n_vale", nullable = false)
    private long nVale;

    @ManyToOne
    @JoinColumn(name = "id_usuario", nullable = false)
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "id_empresa", nullable = false)
    private Empresa empresa;

    @Column(name = "origen", nullable = false)
    private String origen;

    @Column(name = "destino", nullable = false)
    private String destino;

    @Column(name = "motivo", nullable = false)
    private String motivo;

    @Column(name = "fecha_creacion", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date fechaCreacion;

    @Column(name = "fecha_aprobacion", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date fechaAprobacion;

    @Column(name = "fecha_servicio", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date fechaServicio;

    @ManyToOne
    @JoinColumn(name = "id_pasajero_1", nullable = false)
    private EmpleadoCliente pasajero1;

    @ManyToOne
    @JoinColumn(name = "id_pasajero_2", nullable = false)
    private EmpleadoCliente pasajero2;

    @ManyToOne
    @JoinColumn(name = "id_pasajero_3", nullable = false)
    private EmpleadoCliente pasajero3;

    @ManyToOne
    @JoinColumn(name = "id_pasajero_4", nullable = false)
    private EmpleadoCliente pasajero4;
}
