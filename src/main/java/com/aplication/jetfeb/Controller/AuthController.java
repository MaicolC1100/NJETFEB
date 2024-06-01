package com.aplication.jetfeb.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aplication.jetfeb.dao.UsuarioDao;
import com.aplication.jetfeb.models.Usuario;
import com.aplication.jetfeb.utils.JWTUtil;

import jakarta.servlet.http.HttpSession;


@RestController
@RequestMapping("/api/sesion")
public class AuthController {

    @Autowired
    private UsuarioDao usuarioDao;

     @Autowired
     private JWTUtil jwtUtil;

    @PostMapping("/login")
    public String login(@RequestBody Usuario usuario){
        Usuario usuarioLogin  = usuarioDao.loginUsuario(usuario);
        if (usuarioLogin != null) {
        	return jwtUtil.create(String.valueOf(usuarioLogin.getIdUsuario()), usuarioLogin.getEmail());
        }
        return null;
    }

    @PostMapping("/logout")
    public void logout(HttpSession session) {
        session.invalidate();
    }
}