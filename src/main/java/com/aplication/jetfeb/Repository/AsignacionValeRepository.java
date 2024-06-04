package com.aplication.jetfeb.repository;


import com.aplication.jetfeb.models.Asignacion_Vale;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AsignacionValeRepository extends JpaRepository<Asignacion_Vale, Integer> {
}
