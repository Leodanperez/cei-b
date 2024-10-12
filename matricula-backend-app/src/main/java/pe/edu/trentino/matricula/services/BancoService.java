package pe.edu.trentino.matricula.services;

import pe.edu.trentino.matricula.dto.BancoDto;
import pe.edu.trentino.matricula.dto.PaginateResponseDto;
import pe.edu.trentino.matricula.dto.ResponseDto;
import pe.edu.trentino.matricula.models.Banco;

import java.util.List;

public interface BancoService {
    ResponseDto crearBanco(BancoDto bancoDto);
    PaginateResponseDto<Banco> obtenerBancos(String nombre, int page, int perPage);
    ResponseDto actualizarBanco(Long id, BancoDto bancoDto);
    ResponseDto elimarBanco(Long id);
}
