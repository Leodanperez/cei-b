package pe.edu.trentino.matricula.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class DetalleMatriculaDto {
    private Long id;
    private String codigo;
    private String estudiante;
    private LocalDate fechaNac;
    private String genero;
    private String nivel;
    private String grado;
    private String seccion;
    private LocalDateTime fechaMatricula;
    private String situacion;
    private String apoderado;
    private String parentesco;
    private String contacto;
    private BigDecimal costoMatricula;
    private BigDecimal descuentoMensualidad;
    private BigDecimal mensualidadFinal;
    private int totalEndeudo;
    private int deudaPendiente;
    private int mesesPagados;
    private int totalPagado;
}
