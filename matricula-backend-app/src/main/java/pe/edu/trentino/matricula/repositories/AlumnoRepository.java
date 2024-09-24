package pe.edu.trentino.matricula.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pe.edu.trentino.matricula.models.Alumno;

public interface AlumnoRepository extends JpaRepository<Alumno, Long> {
}
