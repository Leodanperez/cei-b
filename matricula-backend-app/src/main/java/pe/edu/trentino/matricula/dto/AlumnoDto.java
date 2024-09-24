package pe.edu.trentino.matricula.dto;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;

@Data
@AllArgsConstructor
public class AlumnoDto {
    private String nombres;
    private String apellidos;
    private String dni;
    private String email;
    private LocalDate fechaNac;
    private String genero;
}
