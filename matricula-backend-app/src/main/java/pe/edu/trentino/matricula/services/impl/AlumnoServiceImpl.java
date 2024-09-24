package pe.edu.trentino.matricula.services.impl;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import pe.edu.trentino.matricula.dto.AlumnoDto;
import pe.edu.trentino.matricula.models.Alumno;
import pe.edu.trentino.matricula.repositories.AlumnoRepository;
import pe.edu.trentino.matricula.services.AlumnoService;

import java.util.List;

@AllArgsConstructor
@Service
public class AlumnoServiceImpl implements AlumnoService {

    //injeccion de dependencias
    private final AlumnoRepository alumnoRepository;

    @Override
    public void crearAlumno(AlumnoDto dto) {
        var alumno = new Alumno();
        alumno.setNombres(dto.getNombres());
        alumno.setApellidos(dto.getApellidos());
        alumno.setDni(dto.getDni());
        alumno.setEmail(dto.getEmail());
        alumno.setFechaNac(dto.getFechaNac());
        alumno.setGenero(dto.getGenero());
        alumnoRepository.save(alumno);
    }

    @Override
    public List<Alumno> obtenerAlumnos() {
        return alumnoRepository.findAll().stream().toList();
    }
}
