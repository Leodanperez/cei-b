package pe.edu.trentino.matricula.controllers;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import pe.edu.trentino.matricula.dto.BancoDto;
import pe.edu.trentino.matricula.dto.MatriculaDto;
import pe.edu.trentino.matricula.dto.MatriculaDtoRequest;
import pe.edu.trentino.matricula.dto.ResponseDto;
import pe.edu.trentino.matricula.services.MatriculaService;

@RestController
@RequiredArgsConstructor
@Slf4j
public class MatriculaController {

    private final MatriculaService matriculaService;

    @PostMapping("/matricular-alumno")
    public ResponseDto matricularAlumno(@RequestBody MatriculaDtoRequest dto) {
        log.info("Ingresando a matricula: {}", dto);
        return matriculaService.matricularAlumno(dto);
    }
}
