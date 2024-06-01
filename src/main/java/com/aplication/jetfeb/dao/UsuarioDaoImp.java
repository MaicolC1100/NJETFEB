package com.aplication.jetfeb.dao;

import java.util.List;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.stereotype.Repository;

import com.aplication.jetfeb.models.Usuario;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;

@Repository
@Transactional
public class UsuarioDaoImp implements UsuarioDao {
    
    @PersistenceContext
    private EntityManager entityManager;
    
    @Override
    public Usuario getUsuario(Long idUsuario) {
        String query = "From Usuario WHERE id_usuario = :id_usuario";
        return entityManager.createQuery(query, Usuario.class)
            .setParameter("id_usuario", idUsuario)
            .getSingleResult();
    }

    @Override
    public List<Usuario> getUsuarios() {
        String query = "FROM Usuario";
        return entityManager.createQuery(query, Usuario.class).getResultList();
    }

    @Override
    public void eliminar(Long id) {
        Usuario usuario = entityManager.find(Usuario.class, id);
        entityManager.remove(usuario);
    }

    @Override
    public void registrar(Usuario usuario) {
        entityManager.merge(usuario);
    }

    @Override
    public Usuario loginUsuario(Usuario usuario) {
        String query = "From Usuario WHERE email = :email";
        Usuario usuarioBD = entityManager.createQuery(query, Usuario.class)
            .setParameter("email", usuario.getEmail())
            .getSingleResult();

        if (usuarioBD == null) {
            return null; // No se encontró el usuario con el email proporcionado
        }

        String passHashed = usuarioBD.getPassword(); // Se obtiene la contraseña guarda en la base de datos

        if (BCrypt.checkpw(usuario.getPassword(), passHashed)) { // Se valida la contraseña de la BD contra la contraseña que envio el usuario
            return usuarioBD; // Si la contraseña es correcta se devuelve los datos del usuario
        }

        return null;

    }
}
