package pe.edu.trentino.matricula.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
public class DetalleMatriculaResponseDto {
    private Long id;
    private String alumno;
    private String aula;
    private BigDecimal costoMatricula;
    private BigDecimal mensualidadFinal;
}
