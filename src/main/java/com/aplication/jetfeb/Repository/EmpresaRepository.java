package com.aplication.jetfeb.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.aplication.jetfeb.models.Empresa;

@Repository
public interface EmpresaRepository extends JpaRepository<Empresa, Integer> {
    // Aquí puedes agregar métodos de consulta personalizados si es necesario
}