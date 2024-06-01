package com.aplication.jetfeb.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aplication.jetfeb.dao.UsuarioDao;
import com.aplication.jetfeb.models.Usuario;

import jakarta.servlet.http.HttpSession;


@RestController
@RequestMapping("/api/sesion")
public class AuthController {

    @Autowired
    private UsuarioDao usuarioDao;

    @PostMapping("/login")
    public boolean login(@RequestBody Usuario usuario, HttpSession session){
        boolean isAuthenticated = usuarioDao.loginUsuario(usuario);
        if (isAuthenticated) {
            session.setAttribute("isLoggedIn", true);
        }
        return isAuthenticated;
    }

    @PostMapping("/logout")
    public void logout(HttpSession session) {
        session.invalidate();
    }
}