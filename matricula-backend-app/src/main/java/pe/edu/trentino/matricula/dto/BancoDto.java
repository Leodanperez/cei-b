package pe.edu.trentino.matricula.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class BancoDto {
    private String nombre;
    private String direccion;
    private String codigo;
}
