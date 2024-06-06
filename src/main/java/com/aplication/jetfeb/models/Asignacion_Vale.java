package com.aplication.jetfeb.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@Entity
@Table(name = "asignacion_vale")
public class Asignacion_Vale {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_asigvale", nullable = false)
    private int idAsigVale;

    @Column(name = "n_vale", nullable = false)
    private long nVale;

    @ManyToOne
    @JoinColumn(name = "id_usuario", nullable = false)
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "id_empresa", nullable = false)
    private Empresa empresa;

    @ManyToOne
    @JoinColumn(name = "id_empleado", nullable = false)
    private Empleado empleado;

    @Column(name = "placa", nullable = false)
    private String placa;

    @Column(name = "origen", nullable = false)
    private String origen;

    @Column(name = "destino", nullable = false)
    private String destino;

    @Column(name = "motivo", nullable = false)
    private String motivo;

    @Column(name = "valorvale", nullable = false)
    private double valorVale;

    @Column(name = "fecha_creacion", nullable = false)
    @Temporal(TemporalType.DATE)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private Date fechaCreacion;

    @Column(name = "fecha_aprobacion", nullable = false)
    @Temporal(TemporalType.DATE)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private Date fechaAprobacion;

    @Column(name = "fecha_servicio", nullable = false)
    @Temporal(TemporalType.DATE)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private Date fechaServicio;

    @ManyToOne
    @JoinColumn(name = "id_pasajero_1")
    private EmpleadoCliente pasajero1;

    @ManyToOne
    @JoinColumn(name = "id_pasajero_2")
    private EmpleadoCliente pasajero2;

    @ManyToOne
    @JoinColumn(name = "id_pasajero_3")
    private EmpleadoCliente pasajero3;

    @ManyToOne
    @JoinColumn(name = "id_pasajero_4")
    private EmpleadoCliente pasajero4;
}
