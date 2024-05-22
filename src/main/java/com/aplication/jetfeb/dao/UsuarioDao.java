package com.aplication.jetfeb.dao;

import java.util.List;

import com.aplication.jetfeb.models.Usuario;

public interface UsuarioDao {
	
	Usuario getUsuario(String email, String password);

	List<Usuario> getUsuarios();

	void eliminar(Long idUsuario);

	void registrar(Usuario usuario);

	
}
