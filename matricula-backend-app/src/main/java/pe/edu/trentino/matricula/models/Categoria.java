package pe.edu.trentino.matricula.models;

import jakarta.persistence.*;
import lombok.*;


//Anotacion
@Data //getter setter tostring
@NoArgsConstructor //generar un constructor sin argumentos
@AllArgsConstructor //generar un constructor con todos los atributos
@Entity //marca la clase como una entidad de base de datos
@Table(name = "categorias") //marca la tabla en la base de datos donde se almacenara la entidad
public class Categoria {
    //Propiedades
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
    private String descripcion;
}
