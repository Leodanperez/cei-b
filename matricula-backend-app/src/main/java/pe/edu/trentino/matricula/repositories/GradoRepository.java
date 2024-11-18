package pe.edu.trentino.matricula.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pe.edu.trentino.matricula.models.Grado;

public interface GradoRepository extends JpaRepository<Grado, Long> {
}
