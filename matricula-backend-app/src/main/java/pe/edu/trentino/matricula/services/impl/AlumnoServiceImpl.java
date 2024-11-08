package pe.edu.trentino.matricula.services.impl;

import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import pe.edu.trentino.matricula.config.HandlerException;
import pe.edu.trentino.matricula.dto.AlumnoDto;
import pe.edu.trentino.matricula.dto.AlumnoDtoResponse;
import pe.edu.trentino.matricula.dto.PaginateResponseDto;
import pe.edu.trentino.matricula.dto.ResponseDto;
import pe.edu.trentino.matricula.models.Alumno;
import pe.edu.trentino.matricula.repositories.AlumnoRepository;
import pe.edu.trentino.matricula.services.AlumnoService;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class AlumnoServiceImpl implements AlumnoService {

    //injeccion de dependencias
    private final AlumnoRepository alumnoRepository;

    @Override
    public ResponseDto crearAlumno(AlumnoDto alumnoDto) {
        var response = new ResponseDto();
        Optional<Alumno> existAlumnoByDni = alumnoRepository.findByDni(alumnoDto.getDni());
        Optional<Alumno> existAlumnoByEmail = alumnoRepository.findByEmail(alumnoDto.getEmail());
        if (existAlumnoByDni.isPresent()) {
            response.setStatus(422);
            response.setMessage("El dni ya se encuentra registrado");
            return response;
        }
        if (existAlumnoByEmail.isPresent()) {
            response.setStatus(422);
            response.setMessage("El email ya se encuentra registrado");
            return response;
        }
        try {
            var alumno = Alumno.builder()
                    .dni(alumnoDto.getDni())
                    .nombres(alumnoDto.getNombres())
                    .apellidos(alumnoDto.getApellidos())
                    .email(alumnoDto.getEmail())
                    .genero(alumnoDto.getGenero())
                    .fechaNac(alumnoDto.getFechaNac())
                    .build();
            alumnoRepository.save(alumno);
            response.setStatus(200);
            response.setMessage("Alumno creado correctamente");
        } catch (Exception e) {
            throw new HandlerException(HttpStatus.NOT_FOUND, "Alumno no encontrado");
        }
        return response;
    }

    @Override
    public PaginateResponseDto<Alumno> obtenerAlumnos(String dni, int page, int perPage) {
        Pageable pageable = PageRequest.of(page - 1, perPage);
        Page<Alumno> alumnoPage = alumnoRepository.findByDniContainingIgnoreCase(dni, pageable);
        return new PaginateResponseDto<>(
                alumnoPage.getContent(),
                page,
                perPage,
                alumnoPage.getTotalElements()
        );
    }

    @Override
    public ResponseDto actualizarAlumno(Long id, AlumnoDto alumnoDto) {
        var response = new ResponseDto();
        try {
            Optional<Alumno> optionalAlumno = alumnoRepository.findById(id);
            if (optionalAlumno.isPresent()) {
                var alumno = optionalAlumno.get();

                alumno.setDni(alumnoDto.getDni());
                alumno.setNombres(alumnoDto.getNombres());
                alumno.setApellidos(alumnoDto.getApellidos());
                alumno.setEmail(alumnoDto.getEmail());
                alumno.setGenero(alumnoDto.getGenero());
                alumno.setFechaNac(alumnoDto.getFechaNac());
                alumnoRepository.save(alumno);

                response.setStatus(200);
                response.setMessage("Alumno actualizado correctamente");
            }
        } catch (Exception e) {
            throw new HandlerException(HttpStatus.NOT_FOUND, "Alumno no encontrado");
        }
        return response;
    }

    @Override
    public Optional<Alumno> obtnerAlumnoId(Long id) {
        return Optional.empty();
    }

    @Override
    public ResponseDto eliminarAlumno(Long id) {
        var response = new ResponseDto();
        Optional<Alumno> optionalAlumno = alumnoRepository.findById(id);
        if (optionalAlumno.isPresent()) {
            alumnoRepository.deleteById(id);
            response.setStatus(200);
            response.setMessage("Alumno eliminado correctamente");
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Alumno no encontrado");
        }
        return response;
    }

    @Override
    public List<AlumnoDtoResponse> buscarAlumnoPorDni(String dni) {
        return List.of();
    }
}
