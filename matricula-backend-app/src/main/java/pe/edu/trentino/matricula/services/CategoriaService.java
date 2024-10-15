package pe.edu.trentino.matricula.services;

import pe.edu.trentino.matricula.dto.CategoriaDto;
import pe.edu.trentino.matricula.models.Categoria;

import java.util.List;

public interface CategoriaService {
    // Implementación de métodos para gestionar categorías
    // (crear, leer, actualizar, eliminar)
    Categoria crearCategoria(CategoriaDto categoriaDto);
    List<Categoria> obtenerCategorias();
}
