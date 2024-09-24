package pe.edu.trentino.matricula.services.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pe.edu.trentino.matricula.dto.BancoDto;
import pe.edu.trentino.matricula.models.Banco;
import pe.edu.trentino.matricula.repositories.BancoRepository;
import pe.edu.trentino.matricula.services.BancoService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BancoServiceImpl implements BancoService {

    private final BancoRepository bancoRepository;

    @Override
    public void crearBanco(BancoDto bancoDto) {
        var banco = new Banco();
        banco.setNombre(bancoDto.getNombre());
        banco.setDireccion(bancoDto.getDireccion());
        banco.setCodigo(bancoDto.getCodigo());
        bancoRepository.save(banco);
    }

    @Override
    public List<Banco> obtenerBancos() {
        return bancoRepository.findAll().stream().toList();
    }
}
