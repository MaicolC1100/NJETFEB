package com.aplication.jetfeb.dao;

import java.util.List;

import com.aplication.jetfeb.models.Usuario;

public interface UsuarioDao {
	
	List<Usuario> getUsuarios();

	void eliminar(Long id);

	void registrar(Usuario usuario);

	
}
