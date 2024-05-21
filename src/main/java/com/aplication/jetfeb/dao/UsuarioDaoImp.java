package com.aplication.jetfeb.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.aplication.jetfeb.models.Usuario;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;


@Repository
@Transactional
public class UsuarioDaoImp implements UsuarioDao{
	
	@PersistenceContext
	private EntityManager entityManager;
	
	@Override
	public List<Usuario> getUsuarios() {
		String query = "FROM Usuario";
		return entityManager.createQuery(query).getResultList();
 	}

	@Override
	public void eliminar(Long id) {
		Usuario usuario = entityManager.find(Usuario.class , id);
		entityManager.remove(usuario);
	}

	@Override
	public void registrar(Usuario usuario) {
		entityManager.merge(usuario);
		
	}


}