package com.aplication.jetfeb.controller;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aplication.jetfeb.dao.UsuarioDao;
import com.aplication.jetfeb.models.Usuario;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

	@Autowired
	private UsuarioDao usuarioDao;

	@PostMapping("/guardar")
	public void registrarUsuario(@RequestBody Usuario usuario) {

		//Se genera el hash de la contrasena para guardar en la BD
		usuario.setPassword(BCrypt.hashpw(usuario.getPassword(), BCrypt.gensalt()));

		usuarioDao.registrar(usuario);
	}
}
