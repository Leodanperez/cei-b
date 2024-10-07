package pe.edu.trentino.matricula.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pe.edu.trentino.matricula.models.Banco;

public interface BancoRepository extends JpaRepository<Banco, Long> {
}