package pe.edu.trentino.matricula.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pe.edu.trentino.matricula.models.NivelEducativo;

public interface NivelRepository extends JpaRepository<NivelEducativo, Long> {
}
