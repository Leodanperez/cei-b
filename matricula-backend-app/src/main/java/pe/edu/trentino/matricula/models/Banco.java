package pe.edu.trentino.matricula.models;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity(name = "bancos")
public class Banco {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
    private String direccion;
    private String codigo;

    @OneToMany(mappedBy = "banco")
    private List<Pago> pagos;
}
