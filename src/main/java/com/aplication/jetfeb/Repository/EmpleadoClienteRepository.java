package com.aplication.jetfeb.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.aplication.jetfeb.models.EmpleadoCliente;

@Repository
public interface EmpleadoClienteRepository extends JpaRepository<EmpleadoCliente, Integer> {
    // Aquí puedes agregar métodos de consulta personalizados si es necesario
}
