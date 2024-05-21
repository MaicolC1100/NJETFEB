package com.aplication.jetfeb.Controller;

import org.springframework.web.bind.annotation.RestController;

import com.aplication.jetfeb.dao.UsuarioDao;
import com.aplication.jetfeb.models.Usuario;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;


@RestController
public class UsuarioController  {

	
	@Autowired
	private UsuarioDao usuarioDao;
	
	
	@RequestMapping(value = "api/usuario/{id}", method = RequestMethod.GET)
	public Usuario getUsuario(@PathVariable Long id) {
		Usuario usuario = new Usuario();
		usuario.setId(id);
		usuario.setNombre("Maicol");
		usuario.setApellido("Cifuentes");
		usuario.setEmail("maicolpalabras@gmail.com");
		usuario.setTelefono("3167556055");
		usuario.setPassword("213421421");
		return usuario;
	}
	
	@RequestMapping(value = "api/usuarios", method = RequestMethod.GET)
	public List<Usuario>  getUsuarios(){
		return usuarioDao.getUsuarios();
		
	}
	
	@RequestMapping(value = "api/usuarios", method = RequestMethod.POST)
	public void  registrarUsuario(@RequestBody Usuario usuario){
		 usuarioDao.registrar(usuario);
	}


	@RequestMapping(value = "api/usuarios/{id}", method = RequestMethod.DELETE)
	public void  eliminar(@PathVariable Long id) {
		usuarioDao.eliminar(id);
	}


}
