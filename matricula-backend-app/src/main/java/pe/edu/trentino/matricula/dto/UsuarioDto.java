package pe.edu.trentino.matricula.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UsuarioDto {
    private String nombre;
    private String apellido;
    private String email;
    private String password;
}
