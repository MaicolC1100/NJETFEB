package com.aplication.jetfeb.Repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.aplication.jetfeb.models.Empleado;

@Repository
public interface EmpleadoRepository extends JpaRepository<Empleado, Integer> {
    // Aquí puedes agregar métodos de consulta personalizados si es necesario
}