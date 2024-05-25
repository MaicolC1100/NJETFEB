package com.aplication.jetfeb.repository;


import com.aplication.jetfeb.models.Solicitud_Vale;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SolicitudValeRepository extends JpaRepository<Solicitud_Vale, Integer> {
}
