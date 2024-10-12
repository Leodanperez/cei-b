package pe.edu.trentino.matricula.config;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public class HandlerException extends RuntimeException {
    private final HttpStatus status;
    private final String message;
}
