package pe.edu.trentino.matricula.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class AlumnoDtoResponse {
    private Long id;
    private String dni;
    private String nombres;
    private String apellidos;
    private String email;
    private String genero;
    private LocalDate fechaNac;
}
