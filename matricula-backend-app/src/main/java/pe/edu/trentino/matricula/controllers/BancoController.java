package pe.edu.trentino.matricula.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.edu.trentino.matricula.dto.BancoDto;
import pe.edu.trentino.matricula.dto.PaginateResponseDto;
import pe.edu.trentino.matricula.dto.ResponseDto;
import pe.edu.trentino.matricula.services.BancoService;

import java.util.Collections;

@RequiredArgsConstructor
@RestController
@CrossOrigin(origins = "http://localhost:3000/")
public class BancoController {

    private final BancoService bancoService;

    @PostMapping("/crear-banco")
    public ResponseDto crearBanco(@RequestBody BancoDto dto) {
        return bancoService.crearBanco(dto);
    }

    @GetMapping("/obtener-bancos")
    public ResponseEntity<PaginateResponseDto<?>> obtenerBancos(
            @RequestParam(defaultValue = "") String nombre,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int perPage
    ) {
        return ResponseEntity.ok(bancoService.obtenerBancos(nombre, page, perPage));
    }

    @PutMapping("/actualizar-banco/{bancoId}")
    public ResponseDto actualizarBanco(@PathVariable(name = "bancoId") Long bancoId, @RequestBody BancoDto dto) {
        return bancoService.actualizarBanco(bancoId, dto);
    }

    @DeleteMapping("/eliminar-banco/{bancoId}")
    public ResponseDto eliminarBanco(@PathVariable(name = "bancoId") Long bancoId) {
        return bancoService.elimarBanco(bancoId);
    }
}
