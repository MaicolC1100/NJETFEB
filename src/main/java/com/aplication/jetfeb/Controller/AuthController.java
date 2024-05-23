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
public class AuthController {

    @Autowired
    private UsuarioDao usuarioDao;

    // @Autowired
    // private JWTUtil jwtUtil;

    @RequestMapping(value = "api/login", method = RequestMethod.POST)
    public boolean login(@RequestBody Usuario usuario){
        
        // String plaintextPassword = usuario.getPassword();
        // usuario.setPassword(BCrypt.hashpw(plaintextPassword, BCrypt.gensalt()));

        // if (user != null){
        //     return jwtUtil.create(String.valueOf(user.getIdUsuario()), user.getUserName());
        // }
        return usuarioDao.loginUsuario(usuario);
    }
}
