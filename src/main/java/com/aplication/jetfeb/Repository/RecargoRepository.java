package com.aplication.jetfeb.repository;


import com.aplication.jetfeb.models.Recargo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecargoRepository extends JpaRepository<Recargo, Integer> {
}
