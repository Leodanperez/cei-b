package pe.edu.trentino.matricula.services.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pe.edu.trentino.matricula.dto.UsuarioDto;
import pe.edu.trentino.matricula.models.Categoria;
import pe.edu.trentino.matricula.models.Usuario;
import pe.edu.trentino.matricula.repositories.UsuarioRepository;
import pe.edu.trentino.matricula.services.UsuarioService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UsuarioServiceImpl implements UsuarioService {

    private final UsuarioRepository usuarioRepository;

    @Override
    public Usuario crearUsuario(UsuarioDto usuarioDto) {
        Usuario nuevaCategoria = new Usuario();
        nuevaCategoria.setNombre(usuarioDto.getNombre());
        return usuarioRepository.save(nuevaCategoria);
    }

    @Override
    public List<Usuario> obtenerUsuarios() {
        return List.of();
    }
}
