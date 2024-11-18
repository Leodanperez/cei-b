package pe.edu.trentino.matricula.services.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import pe.edu.trentino.matricula.config.HandlerException;
import pe.edu.trentino.matricula.dto.MatriculaDtoRequest;
import pe.edu.trentino.matricula.dto.ResponseDto;
import pe.edu.trentino.matricula.models.Alumno;
import pe.edu.trentino.matricula.models.Matricula;
import pe.edu.trentino.matricula.repositories.*;
import pe.edu.trentino.matricula.services.MatriculaService;

import java.time.LocalDateTime;

@RequiredArgsConstructor
@Service
public class MatriculaServiceImpl implements MatriculaService {

    private final MatriculaRepository matriculaRepository;
    private final AlumnoRepository alumnoRepository;
    private final ApoderadoRepository apoderadoRepository;
    private final NivelRepository nivelRepository;
    private final GradoRepository gradoRepository;
    private final SeccionRepository seccionRepository;

    @Override
    public ResponseDto matricularAlumno(MatriculaDtoRequest matriculaDto) {
        var response = new ResponseDto();
        try {
            //Obtener los datos del alumno
            Alumno alumno = alumnoRepository
                    .findById(matriculaDto.getAlumnoId())
                    .orElseThrow(()
                            -> new HandlerException(HttpStatus.NOT_FOUND, "Alumno no encontrado"));

            // Crear objeto matricula
            Matricula matricula = new Matricula();
            matricula.setCodigo(matricula.getCodigo());
            matricula.setAlumno(alumnoRepository.findById(matriculaDto.getAlumnoId())
                    .orElseThrow(() -> new HandlerException(HttpStatus.NOT_FOUND, "Alumno no encontrado")));
            matricula.setApoderado(apoderadoRepository.findById(matriculaDto.getApoderadoId())
                    .orElseThrow(() -> new HandlerException(HttpStatus.NOT_FOUND, "Apoderado no encontrado")));
            matricula.setNivel(nivelRepository.findById(matriculaDto.getNivelId())
                    .orElseThrow(() -> new HandlerException(HttpStatus.NOT_FOUND, "Nivel no encontrado")));
            matricula.setGrado(gradoRepository.findById(matriculaDto.getGradoId())
                    .orElseThrow(() -> new HandlerException(HttpStatus.NOT_FOUND, "Grado no encontrado")));
            matricula.setSeccion(seccionRepository.findById(matriculaDto.getSeccionId())
                    .orElseThrow(() -> new HandlerException(HttpStatus.NOT_FOUND, "Seccion no encontrado")));
            matricula.setFechaMatricula(LocalDateTime.now());
            matricula.setSituacion(matriculaDto.getSituacion());
            matricula.setProcedencia(matriculaDto.getProcedencia());
            matricula.setParentesco(matriculaDto.getParentesco());
            matricula.setInstitucionProcedencia(matriculaDto.getInstitucionProcedencia());
            matricula.setCostoMatricula(matriculaDto.getCostoMatricula());
            matricula.setCostoMensualidad(matriculaDto.getCostoMensualidad());
            matricula.setDescuentoMensualidad(matriculaDto.getDescuentoMensualidad());
            matricula.setMensualidadFinal(matriculaDto.getMensualidadFinal());
            matriculaRepository.save(matricula);
            response.setStatus(200);
            response.setMessage("Alumno(a) " + alumno.getNombres() + " " + alumno.getApellidos() + " matriculado correctamente");
        } catch (Exception e) {
            throw new HandlerException(HttpStatus.NOT_FOUND, "Apoderado no encontrado");
        }
        return response;
    }

    public String generateCodeMatricula(String nombre, String apellidos, String dni, int anio) {
        // Extraer la primera letra del nombre
        String inicialNombre = !nombre.isEmpty() ? nombre.substring(0, 1).toUpperCase() : "";

        // Extraer la primera letra del primer apellido
        String inicialApellido = !apellidos.isEmpty() ? apellidos.split(" ")[0].substring(0, 1).toUpperCase() : "";

        // Formatear el código de matrícula
        return inicialNombre + inicialApellido + dni + anio;
    }
}
