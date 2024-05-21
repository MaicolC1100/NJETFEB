package com.aplication.jetfeb.Controller;

import org.springframework.web.bind.annotation.RestController;

import com.aplication.jetfeb.dao.UsuarioDao;
import com.aplication.jetfeb.models.Usuario;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
public class UsuarioController implements UsuarioDao {

	@RequestMapping(value = "/usuario/{id}")
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
	
	@RequestMapping(value = "/usuario")
	public List<Usuario>  getUsuario(){

		List<Usuario> usuarios = new ArrayList<>();

		Usuario usuario = new Usuario();
		usuario.setId(2311L);
		usuario.setNombre("Maicol");
		usuario.setApellido("Cifuentes");
		usuario.setEmail("maicolpalabras@gmail.com");
		usuario.setTelefono("3167556055");
		usuario.setPassword("213421421");

		usuarios.add(usuario);
		return usuarios;
	
	}
	
	
//
//	@RequestMapping(value = "usuario")
//	public Usuario editar() {
//		Usuario usuario = new Usuario();
//		usuario.setNombre("Maicol");
//		usuario.setApellido("Cifuentes");
//		usuario.setEmail("maicolpalabras@gmail.com");
//		usuario.setTelefono("3167556055");
//		usuario.setPassword("213421421");
//		return usuario;
//	}
//	
//
//	@RequestMapping(value = "usuario")
//	public Usuario eliminar() {
//		Usuario usuario = new Usuario();
//		usuario.setNombre("Maicol");
//		usuario.setApellido("Cifuentes");
//		usuario.setEmail("maicolpalabras@gmail.com");
//		usuario.setTelefono("3167556055");
//		usuario.setPassword("213421421");
//		return usuario;
//	}
//	
//	@RequestMapping(value = "usuario")
//	public Usuario buscar() {
//		Usuario usuario = new Usuario();
//		usuario.setNombre("Maicol");
//		usuario.setApellido("Cifuentes");
//		usuario.setEmail("maicolpalabras@gmail.com");
//		usuario.setTelefono("3167556055");
//		usuario.setPassword("213421421");
//		return usuario;
//	}

}
