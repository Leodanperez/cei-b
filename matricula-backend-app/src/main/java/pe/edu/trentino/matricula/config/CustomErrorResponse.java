package pe.edu.trentino.matricula.config;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@AllArgsConstructor
@Data
public class CustomErrorResponse {
    private int status;
    private String error;
    private String message;
    private String path;
    private LocalDateTime timeStamp;
}
