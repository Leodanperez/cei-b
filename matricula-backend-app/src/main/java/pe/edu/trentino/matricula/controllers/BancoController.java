package pe.edu.trentino.matricula.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.edu.trentino.matricula.dto.BancoDto;
import pe.edu.trentino.matricula.services.BancoService;

import java.util.Collections;

@RequiredArgsConstructor
@RestController
@CrossOrigin(origins = "http://localhost:3000/")
public class BancoController {

    private final BancoService bancoService;

    @PostMapping("/crear-banco")
    public ResponseEntity<?> crearBanco(@RequestBody BancoDto dto) {
        bancoService.crearBanco(dto);
        return ResponseEntity.ok(
                Collections.singletonMap("message", "Se guardo correctamente")
        );
    }

    @GetMapping("/obtner-bancos")
    public ResponseEntity<?> obtenerBancos() {
        return ResponseEntity.ok(bancoService.obtenerBancos());
    }
}
