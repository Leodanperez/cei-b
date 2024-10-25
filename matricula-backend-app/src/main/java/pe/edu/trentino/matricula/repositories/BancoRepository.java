package pe.edu.trentino.matricula.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import pe.edu.trentino.matricula.models.Banco;

import java.util.Optional;

public interface BancoRepository extends JpaRepository<Banco, Long> {
    Page<Banco> findByNombreContainingIgnoreCase(String nombre, Pageable pageable);
    Optional<Banco> findByNombre(String nombre);
}
