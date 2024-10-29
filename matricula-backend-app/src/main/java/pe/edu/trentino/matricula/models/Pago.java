package pe.edu.trentino.matricula.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity(name = "pagos")
public class Pago {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime fechaPago;
    private String tipoPago;

    @Column(nullable = false)
    private String canalPago;

    private BigDecimal monto;
    private int mesCorrespondiente;
    private String numeroTicket;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "matricula_id", nullable = false)
    private Matricula matricula;

    @ManyToOne
    @JoinColumn(name = "banco_id")
    private Banco banco;
}
