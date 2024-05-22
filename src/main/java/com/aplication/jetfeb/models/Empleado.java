package com.aplication.jetfeb.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "empleado")
public class Empleado {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_empleado")
    private int idEmpleado;

    @Column(name = "cedula", nullable = false, unique = true)
    private String cedula;

    @Column(name = "nombre", nullable = false)
    private String nombre;

    @Column(name = "cargo", nullable = false)
    private String cargo;

    @Column(name = "celular", nullable = false)
    private String celular;

    @Column(name = "correo", nullable = false)
    private String correo;

    @Column(name = "placa", nullable = false)
    private String placa;

    @Column(name = "estado", nullable = false)
    private boolean estado;
}
