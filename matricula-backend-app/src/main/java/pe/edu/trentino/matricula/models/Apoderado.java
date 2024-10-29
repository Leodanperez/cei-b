package pe.edu.trentino.matricula.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity(name = "apoderados")
public class Apoderado {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String dni;
    private String nombres;
    private String apellidos;

    @Column(unique = true)
    private String email;

    private String telefono;

    @OneToMany(mappedBy = "apoderado", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Matricula> matriculas;

    @JsonIgnore
    private LocalDateTime createdAt;
}
