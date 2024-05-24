package com.aplication.jetfeb.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "empleado_cliente")
public class EmpleadoCliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_empleado_cliente")
    private int idEmpleadoCliente;

    @ManyToOne
    @JoinColumn(name = "id_empresa", nullable = false)
    private Empresa empresa;

    @Column(name = "nombre", nullable = false)
    private String nombre;
    
    @Column(name = "apellido", nullable = false)
    private String apellido;
        
    @Column(name = "ctro_costo", nullable = false)
    private String ctroCosto;

    @Column(name = "gerencia", nullable = false)
    private String gerencia;

    @Column(name = "cedula", nullable = false)
    private String cedula;

    @Column(name = "estado", nullable = false)
    private Boolean estado;
    
}
