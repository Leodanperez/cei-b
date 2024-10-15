package pe.edu.trentino.matricula.services.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pe.edu.trentino.matricula.dto.CategoriaDto;
import pe.edu.trentino.matricula.models.Categoria;
import pe.edu.trentino.matricula.repositories.CategoriaRepository;
import pe.edu.trentino.matricula.services.CategoriaService;

import java.util.List;

//un servicio es ujna clase que encapsula la loogica de negocio de una aplicacion, este servicio actua como
//un intermediario entre el controlador y la capa de persistencia
@Service
@RequiredArgsConstructor
public class CategoriaServiceImpl implements CategoriaService {

    private final CategoriaRepository categoriaRepository;

    @Override
    public Categoria crearCategoria(CategoriaDto categoriaDto) {
        //es una instancia de crear un objeto en java, de clase Categoria
        Categoria nuevaCategoria = new Categoria();
        nuevaCategoria.setNombre(categoriaDto.getNombre());
        nuevaCategoria.setDescripcion(categoriaDto.getDescripcion());
        return categoriaRepository.save(nuevaCategoria);
    }

    @Override
    public List<Categoria> obtenerCategorias() {
        return categoriaRepository.findAll().stream().toList();
    }
}
