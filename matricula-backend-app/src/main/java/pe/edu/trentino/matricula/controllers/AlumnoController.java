package pe.edu.trentino.matricula.controllers;


import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.edu.trentino.matricula.dto.AlumnoDto;
import pe.edu.trentino.matricula.dto.PaginateResponseDto;
import pe.edu.trentino.matricula.dto.ResponseDto;
import pe.edu.trentino.matricula.models.Alumno;
import pe.edu.trentino.matricula.services.AlumnoService;

@RequiredArgsConstructor
@RestController
@CrossOrigin(origins = "http://localhost:3000/")
public class AlumnoController {
    private final AlumnoService alumnoService;

    @GetMapping("alumnos")
    public ResponseEntity<PaginateResponseDto<Alumno>> obtnerAlumnos(
            @RequestParam(defaultValue = "") String dni,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int perPage
    ) {
        return ResponseEntity.ok(alumnoService.obtenerAlumnos(dni, page, perPage));
    }

    @PostMapping("alumno")
    public ResponseDto crearAlumno(@RequestBody AlumnoDto dto) {
        return alumnoService.crearAlumno(dto);
    }

    @PutMapping("alumno/{alumnoId}")
    public ResponseDto update(@PathVariable(name = "alumnoId") Long alumnoId, @RequestBody AlumnoDto dto) {
        return alumnoService.actualizarAlumno(alumnoId, dto);
    }

    @DeleteMapping("alumno/{alumnoId}")
    public ResponseDto deleteAlumno(@PathVariable(name = "alumnoId") Long alumnoId) {
        return alumnoService.eliminarAlumno(alumnoId);
    }
}
