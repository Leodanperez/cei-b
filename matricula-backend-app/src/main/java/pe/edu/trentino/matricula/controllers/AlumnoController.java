package pe.edu.trentino.matricula.controllers;


import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import pe.edu.trentino.matricula.dto.AlumnoDto;
import pe.edu.trentino.matricula.services.AlumnoService;

import java.util.Collections;

@RequiredArgsConstructor
@RestController
public class AlumnoController {
    private final AlumnoService alumnoService;

    @PostMapping("/crear-alumno")
    public ResponseEntity<?> crearAlumno(@RequestBody AlumnoDto dto) {
        alumnoService.crearAlumno(dto);
        return ResponseEntity.ok(
                Collections.singletonMap("message", "Se guardo correctamente")
        );
    }

    @GetMapping("/obtner-alumnos")
    public ResponseEntity<?> obtenerAlumnos() {
        return ResponseEntity.ok(alumnoService.obtenerAlumnos());
    }
}
