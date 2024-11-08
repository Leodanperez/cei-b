package pe.edu.trentino.matricula.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import pe.edu.trentino.matricula.dto.MatriculaDto;
import pe.edu.trentino.matricula.models.Matricula;

public interface MatriculaRepository extends JpaRepository<Matricula, Long> {
    @Query("SELECT new pe.edu.trentino.matricula.dto.MatriculaDto(" +
            "m.id, " +
            "m.codigo, " +
            "CONCAT(a.nombres, ' ', a.apellidos), ne.nombre, g.nombre, s.nombre, m.situacion) " +
            "FROM matriculas m " +
            "JOIN m.alumno a " +
            "JOIN m.nivel ne "+
            "JOIN m.grado g "+
            "JOIN m.seccion s "+
            "WHERE LOWER(a.nombres) LIKE LOWER(CONCAT('%', :nombres, '%'))"+
            "OR LOWER(a.apellidos) LIKE LOWER(CONCAT('%', :nombres, '%'))")
    Page<MatriculaDto> buscarMatriculaPorNombredeAlumno(
            @Param("nombres") String nombres, Pageable pageable
    );
}
