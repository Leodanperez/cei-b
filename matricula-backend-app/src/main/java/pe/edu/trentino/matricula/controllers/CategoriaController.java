package pe.edu.trentino.matricula.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import pe.edu.trentino.matricula.dto.CategoriaDto;
import pe.edu.trentino.matricula.services.CategoriaService;

import java.util.Collections;

//es una clase que maneja las peticiones HTTP entrantes y devuelven las respuestas adecuadas
@RestController //marcamos la clase como un controlador REST, Todas la clase devolvera una respuesta
//HTTP en formato JSON o XML
@RequiredArgsConstructor
public class CategoriaController {
    private final CategoriaService categoriaService;

    @GetMapping("obtner-categorias") //response a la solicitud HTTP GET
    public ResponseEntity<?> ontenerCategorias() {
        return ResponseEntity.ok(categoriaService.obtenerCategorias());
    }

    @PostMapping("/crear-categoria") // maneja la solicitud de tipo POST
    public ResponseEntity<?> crearCategoria(@RequestBody CategoriaDto dto) {
        categoriaService.crearCategoria(dto);
        return ResponseEntity.ok(
                Collections.singletonMap("message", "Se guardo correctamente")
        );
    }
}
