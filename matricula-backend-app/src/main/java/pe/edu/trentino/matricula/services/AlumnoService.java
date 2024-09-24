package pe.edu.trentino.matricula.services;

import pe.edu.trentino.matricula.dto.AlumnoDto;
import pe.edu.trentino.matricula.models.Alumno;

import java.util.List;

public interface AlumnoService {
    void crearAlumno(AlumnoDto alumnoDto);
    List<Alumno> obtenerAlumnos();
}
