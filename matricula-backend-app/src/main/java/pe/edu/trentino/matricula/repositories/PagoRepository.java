package pe.edu.trentino.matricula.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import pe.edu.trentino.matricula.models.Pago;

import java.math.BigDecimal;

public interface PagoRepository extends JpaRepository<Pago, Long> {
    @Query("SELECT COALESCE(SUM(p.monto), 0) " +
            "FROM pagos p WHERE p.matricula.id = :matriculaId")
    BigDecimal sumarPagosPorMatriculaId(@Param("matriculaId") Long matriculaId);

    @Query("SELECT COUNT(DISTINCT p.mesCorrespondiente) " +
            "FROM pagos p " +
            "WHERE p.matricula.id = :matriculaId AND p.tipoPago = :tipoPago")
    Long contarMesesPagados(
            @Param("matriculaId") Long matriculaId,
            @Param("tipoPago") String tipoPago);
}
