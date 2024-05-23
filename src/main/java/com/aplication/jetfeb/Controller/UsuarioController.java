package com.aplication.jetfeb.Controller;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.aplication.jetfeb.dao.UsuarioDao;
import com.aplication.jetfeb.models.Usuario;

@RestController
public class UsuarioController {

	@Autowired
	private UsuarioDao usuarioDao;

	// @RequestMapping(value = "api/usuarios/{id}", method = RequestMethod.GET)
	// public Usuario getUsuario(@PathVariable Long id) {
	// 	Usuario usuario = new Usuario();
	// 	usuario.setIdUsuario(id);
	// 	usuario.setNombre("Maicol");
	// 	usuario.setApellido("Cifuentes");
	// 	usuario.setEmail("maicolpalabras@gmail.com");
	// 	usuario.setTelefono("3167556055");
	// 	usuario.setPassword("213421421");
	// 	return usuario;
	// }

	// @RequestMapping(value = "api/usuarios", method = RequestMethod.GET)
	// public List<Usuario> getUsuarios() {
	// 	return usuarioDao.getUsuarios();

	// }

	@RequestMapping(value = "api/usuarios/registro", method = RequestMethod.POST)
	public void registrarUsuario(@RequestBody Usuario usuario) {

		//Se genera el hash de la contrasena para guardar en la BD
		usuario.setPassword(BCrypt.hashpw(usuario.getPassword(), BCrypt.gensalt()));

		usuarioDao.registrar(usuario);
	}

	// @RequestMapping(value = "api/usuarios/eliminar/{id}", method = RequestMethod.DELETE)
	// public void eliminar(@PathVariable Long id) {
	// 	usuarioDao.eliminar(id);
	// }

}
