package pe.edu.trentino.matricula.services;

import pe.edu.trentino.matricula.dto.CategoriaDto;
import pe.edu.trentino.matricula.dto.UsuarioDto;
import pe.edu.trentino.matricula.models.Categoria;
import pe.edu.trentino.matricula.models.Usuario;

import java.util.List;

public interface UsuarioService {
    Usuario crearUsuario(UsuarioDto usuarioDto);
    List<Usuario> obtenerUsuarios();
}
