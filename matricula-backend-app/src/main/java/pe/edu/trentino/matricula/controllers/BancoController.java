package pe.edu.trentino.matricula.controllers;

import com.itextpdf.text.DocumentException;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.edu.trentino.matricula.dto.BancoDto;
import pe.edu.trentino.matricula.dto.PaginateResponseDto;
import pe.edu.trentino.matricula.dto.ResponseDto;
import pe.edu.trentino.matricula.services.BancoService;

import java.io.ByteArrayInputStream;
import java.io.IOException;
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

    @GetMapping("/exportar-excel")
    public void exportarExcel(HttpServletResponse response) throws IOException {
        bancoService.descargarBanco(response);
    }

    @GetMapping(value = "/reporte", produces = MediaType.APPLICATION_PDF_VALUE)
    public ResponseEntity<byte[]> generateBancoReport() {

        ByteArrayInputStream bis;
        try {
            bis = bancoService.generarPdf();
        } catch (DocumentException e) {
            return ResponseEntity.status(500).body(null);
        }

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "inline; filename=banco_reporte.pdf");

        return ResponseEntity
                .ok()
                .headers(headers)
                .contentType(MediaType.APPLICATION_PDF)
                .body(bis.readAllBytes());
    }
}
