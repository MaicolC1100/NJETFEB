package com.aplication.jetfeb.dao;

import java.util.List;

import com.aplication.jetfeb.models.Usuario;

public interface UsuarioDao {
	
	Usuario getUsuario(Long idUsuario);

	List<Usuario> getUsuarios();

	void eliminar(Long idUsuario);

	void registrar(Usuario usuario);

	Usuario loginUsuario(Usuario usuario);
	
}
