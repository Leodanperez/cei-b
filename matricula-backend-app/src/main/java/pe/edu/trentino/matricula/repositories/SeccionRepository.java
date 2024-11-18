package pe.edu.trentino.matricula.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pe.edu.trentino.matricula.models.Seccion;

public interface SeccionRepository extends JpaRepository<Seccion, Long> {
}
