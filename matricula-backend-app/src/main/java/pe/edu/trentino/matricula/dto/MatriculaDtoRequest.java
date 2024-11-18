package pe.edu.trentino.matricula.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class MatriculaDtoRequest {
    private Long alumnoId;
    private Long apoderadoId;
    private Long nivelId;
    private Long gradoId;
    private Long seccionId;
    private String situacion;
    private String procedencia;
    private String institucionProcedencia;
    private BigDecimal costoMatricula;
    private BigDecimal costoMensualidad;
    private BigDecimal descuentoMensualidad;
    private BigDecimal mensualidadFinal;
    private String parentesco;
}
