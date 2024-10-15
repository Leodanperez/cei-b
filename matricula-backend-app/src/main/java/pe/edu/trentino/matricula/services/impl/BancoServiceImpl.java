package pe.edu.trentino.matricula.services.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import pe.edu.trentino.matricula.config.HandlerException;
import pe.edu.trentino.matricula.dto.BancoDto;
import pe.edu.trentino.matricula.dto.PaginateResponseDto;
import pe.edu.trentino.matricula.dto.ResponseDto;
import pe.edu.trentino.matricula.models.Banco;
import pe.edu.trentino.matricula.repositories.BancoRepository;
import pe.edu.trentino.matricula.services.BancoService;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BancoServiceImpl implements BancoService {

    // Inyección de dependencias
    private final BancoRepository bancoRepository;

    @Override
    public ResponseDto crearBanco(BancoDto bancoDto) {
        var response = new ResponseDto();

        if (bancoDto == null || bancoDto.getNombre() == null || bancoDto.getDireccion() == null || bancoDto.getCodigo() == null) {
            response.setStatus(400);
            response.setMessage("Todos los campos son obligatorios");
            return response;
        }

        try {
            var banco = Banco.builder()
                    .nombre(bancoDto.getNombre())
                    .direccion(bancoDto.getDireccion())
                    .codigo(bancoDto.getCodigo())
                    .build();

            bancoRepository.save(banco);

            response.setStatus(200);
            response.setMessage("Banco creado correctamente");
        } catch (Exception e) {
            throw new HandlerException(HttpStatus.NOT_FOUND, "Banco no encontrado");
        }
        return response;
    }

    @Override
    public PaginateResponseDto<Banco> obtenerBancos(String nombre, int page, int perPage) {
        Pageable pageable = PageRequest.of(page - 1, perPage);
        Page<Banco> bancoPage = bancoRepository.findByNombreContainingIgnoreCase(nombre, pageable);

        return new PaginateResponseDto<>(
                bancoPage.getContent(),
                page,
                perPage,
                bancoPage.getTotalElements()
        );
    }

    @Override
    public ResponseDto actualizarBanco(Long id, BancoDto bancoDto) {
        var response = new ResponseDto();

        try {
            Optional<Banco> optionalBanco = bancoRepository.findById(id);

            if (optionalBanco.isPresent()) {
                var banco = optionalBanco.get();

                banco.setNombre(bancoDto.getNombre());
                banco.setDireccion(bancoDto.getDireccion());
                banco.setCodigo(bancoDto.getCodigo());

                bancoRepository.save(banco);

                response.setStatus(200);
                response.setMessage("Banco actualizado correctamente");
            }
        } catch (Exception e) {
            throw new HandlerException(HttpStatus.NOT_FOUND, "Banco no encontrado");
        }
        return response;
    }

    @Override
    public ResponseDto elimarBanco(Long id) {
        var response = new ResponseDto();
        try {
            Optional<Banco> optionalBanco = bancoRepository.findById(id);
            if (optionalBanco.isPresent()) {
                bancoRepository.deleteById(id);
                response.setStatus(200);
                response.setMessage("Banco eliminado correctamente");
            }
        } catch (Exception e) {
            throw new HandlerException(HttpStatus.NOT_FOUND, "Banco no encontrado");
        }
        return response;
    }
}
