package pe.edu.trentino.matricula.config;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.time.LocalDateTime;

@ControllerAdvice
public class CustomExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(HandlerException.class)
    public ResponseEntity<Object> handlerException(HandlerException ex, WebRequest request) {
        CustomErrorResponse response = new CustomErrorResponse(
                ex.getStatus().value(),
                ex.getStatus().getReasonPhrase(),
                ex.getMessage(),
                request.getContextPath(),
                LocalDateTime.now()
        );
        return new ResponseEntity<>(response, ex.getStatus());
    }
}
