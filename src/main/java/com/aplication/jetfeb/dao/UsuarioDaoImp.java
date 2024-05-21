package com.aplication.jetfeb.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.aplication.jetfeb.models.Usuario;

import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;


@Repository
@Transactional
public class UsuarioDaoImp implements UsuarioDao{

	private EntityManager entityManager;
	
	@Override
	public List<Usuario> getUsuario() {
		// TODO Auto-generated method stub
		return null;
	}

}
