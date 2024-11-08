package pe.edu.trentino.matricula.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import pe.edu.trentino.matricula.models.Alumno;

import java.util.List;
import java.util.Optional;

public interface AlumnoRepository extends JpaRepository<Alumno, Long> {
    Page<Alumno> findByDniContainingIgnoreCase(String dni, Pageable pageable);
    List<Alumno> findByDniContaining(String dni);
    Optional<Alumno> findByDni(String dni);
    Optional<Alumno> findByEmail(String email);
}
