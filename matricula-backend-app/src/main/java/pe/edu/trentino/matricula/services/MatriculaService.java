package pe.edu.trentino.matricula.services;

import pe.edu.trentino.matricula.dto.MatriculaDtoRequest;
import pe.edu.trentino.matricula.dto.ResponseDto;

public interface MatriculaService {
    ResponseDto matricularAlumno(MatriculaDtoRequest matriculaDto);
}
