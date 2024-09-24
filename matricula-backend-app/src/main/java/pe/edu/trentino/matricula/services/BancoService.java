package pe.edu.trentino.matricula.services;

import pe.edu.trentino.matricula.dto.BancoDto;
import pe.edu.trentino.matricula.models.Banco;

import java.util.List;

public interface BancoService {
    void crearBanco(BancoDto bancoDto);
    List<Banco> obtenerBancos();
}
