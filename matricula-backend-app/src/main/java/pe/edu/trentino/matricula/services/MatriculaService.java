package pe.edu.trentino.matricula.services;

import pe.edu.trentino.matricula.dto.*;

import java.util.List;

public interface MatriculaService {
    ResponseDto matricularAlumno(MatriculaDtoRequest matriculaDto);
    PaginateResponseDto<MatriculaDto> obtnerMatriculas(String nombre, int page, int perPage);
    List<DetalleMatriculaDto> mostrarDetalleMatricula(String codigo);
    List<DetalleMatriculaResponseDto> mostrarEstudianteCodigo(String codigo);
}
