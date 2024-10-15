package pe.edu.trentino.matricula.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pe.edu.trentino.matricula.models.Categoria;

//JpaRepository es una interfaz que actua como un intermediario (puente) entre la logica
// de negocio (servicios) y la capa de persistencia (base de datos)
public interface CategoriaRepository extends JpaRepository<Categoria, Long> {
    //metodos adicionales
}
