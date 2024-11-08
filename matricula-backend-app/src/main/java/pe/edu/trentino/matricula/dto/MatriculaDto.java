package pe.edu.trentino.matricula.dto;

import lombok.Data;

@Data
public class MatriculaDto {
    private Long id;
    private String codigo;
    private String estudiante;
    private String nivel;
    private String grado;
    private String seccion;
    private String situacion;

    public MatriculaDto(Long id, String codigo, String estudiante, String nivel, String grado, String seccion, String situacion) {
        this.id = id;
        this.codigo = codigo;
        this.estudiante = estudiante;
        this.nivel = nivel;
        this.grado = grado;
        this.seccion = seccion;
        this.situacion = situacion;
    }
}
