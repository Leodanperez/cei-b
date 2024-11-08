package pe.edu.trentino.matricula.services;

import pe.edu.trentino.matricula.dto.AlumnoDto;
import pe.edu.trentino.matricula.dto.AlumnoDtoResponse;
import pe.edu.trentino.matricula.dto.PaginateResponseDto;
import pe.edu.trentino.matricula.dto.ResponseDto;
import pe.edu.trentino.matricula.models.Alumno;

import java.util.List;
import java.util.Optional;

public interface AlumnoService {
    ResponseDto crearAlumno(AlumnoDto alumnoDto);
    PaginateResponseDto<Alumno> obtenerAlumnos(String dni, int page, int perPage);
    ResponseDto actualizarAlumno(Long id, AlumnoDto alumnoDto);
    Optional<Alumno> obtnerAlumnoId(Long id);
    ResponseDto eliminarAlumno(Long id);
    List<AlumnoDtoResponse> buscarAlumnoPorDni(String dni);
}
