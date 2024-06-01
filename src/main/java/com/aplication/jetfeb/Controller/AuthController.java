package com.aplication.jetfeb.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.aplication.jetfeb.dao.UsuarioDao;
import com.aplication.jetfeb.models.Usuario;
import jakarta.servlet.http.HttpSession;


@RestController
public class AuthController {

    @Autowired
    private UsuarioDao usuarioDao;

    @RequestMapping(value = "api/login", method = RequestMethod.POST)
    public boolean login(@RequestBody Usuario usuario, HttpSession session){
        boolean isAuthenticated = usuarioDao.loginUsuario(usuario);
        if (isAuthenticated) {
            session.setAttribute("isLoggedIn", true);
        }
        return isAuthenticated;
    }

    @RequestMapping(value = "api/logout", method = RequestMethod.POST)
    public void logout(HttpSession session) {
        session.invalidate();
    }
}