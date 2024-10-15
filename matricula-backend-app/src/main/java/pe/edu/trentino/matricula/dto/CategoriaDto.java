package pe.edu.trentino.matricula.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

//DTO (Data Transfer Object) es un objeto que se utiliza pra transferir datos entre las
//diferentes capas de la application y la capa de servicios o entre la base de datos
@Data
@AllArgsConstructor
public class CategoriaDto {
    private String nombre;
    private String descripcion;
}
