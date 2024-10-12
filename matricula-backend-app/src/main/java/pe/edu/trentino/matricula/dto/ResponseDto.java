package pe.edu.trentino.matricula.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class ResponseDto {
    private int status;
    private String message;

    public ResponseDto(int status, String message) {
        this.status = status;
        this.message = message;
    }
}
