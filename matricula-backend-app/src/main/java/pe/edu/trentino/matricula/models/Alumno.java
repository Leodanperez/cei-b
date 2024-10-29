package pe.edu.trentino.matricula.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "alumnos")
public class Alumno {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombres;
    private String apellidos;
    private String dni;
    private String email;

    @Column(name = "fecha_nacimiento")
    private LocalDate fechaNac;

    private String genero;
    @OneToMany(mappedBy = "alumno", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Matricula> matriculas;

    @JsonIgnore
    private LocalDateTime createdAt;
}
