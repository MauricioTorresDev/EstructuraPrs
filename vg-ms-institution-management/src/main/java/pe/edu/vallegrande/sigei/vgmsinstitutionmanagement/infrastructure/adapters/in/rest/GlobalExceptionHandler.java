package pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.infrastructure.adapters.in.rest;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.server.ServerWebExchange;
import pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.application.dto.common.ErrorResponse;
import pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.domain.exceptions.ConflictException;
import pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.domain.exceptions.DomainException;
import pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.domain.exceptions.NotFoundException;
import reactor.core.publisher.Mono;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(NotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public Mono<ErrorResponse> handleNotFoundException(NotFoundException ex, ServerWebExchange exchange) {
        log.warn("Recurso no encontrado: {}", ex.getMessage());
        return Mono.just(ErrorResponse.of(
                HttpStatus.NOT_FOUND.value(),
                "Not Found",
                ex.getMessage(),
                exchange.getRequest().getPath().value()
        ));
    }

    @ExceptionHandler(ConflictException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public Mono<ErrorResponse> handleConflictException(ConflictException ex, ServerWebExchange exchange) {
        log.warn("Conflicto: {}", ex.getMessage());
        return Mono.just(ErrorResponse.of(
                HttpStatus.CONFLICT.value(),
                "Conflict",
                ex.getMessage(),
                exchange.getRequest().getPath().value()
        ));
    }

    @ExceptionHandler(DomainException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Mono<ErrorResponse> handleDomainException(DomainException ex, ServerWebExchange exchange) {
        log.error("Error de dominio: {}", ex.getMessage());
        return Mono.just(ErrorResponse.of(
                HttpStatus.BAD_REQUEST.value(),
                "Bad Request",
                ex.getMessage(),
                exchange.getRequest().getPath().value()
        ));
    }

    @ExceptionHandler(IllegalArgumentException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Mono<ErrorResponse> handleIllegalArgument(IllegalArgumentException ex, ServerWebExchange exchange) {
        log.error("Argumento inválido: {}", ex.getMessage());
        return Mono.just(ErrorResponse.of(
                HttpStatus.BAD_REQUEST.value(),
                "Bad Request",
                ex.getMessage(),
                exchange.getRequest().getPath().value()
        ));
    }

    @ExceptionHandler(ResponseStatusException.class)
    public Mono<ErrorResponse> handleResponseStatusException(ResponseStatusException ex, ServerWebExchange exchange) {
        HttpStatus status = HttpStatus.resolve(ex.getStatusCode().value());
        if (status == null) status = HttpStatus.INTERNAL_SERVER_ERROR;
        log.warn("ResponseStatusException: {} - {}", status, ex.getReason());
        exchange.getResponse().setStatusCode(status);
        return Mono.just(ErrorResponse.of(
                status.value(),
                status.getReasonPhrase(),
                ex.getReason() != null ? ex.getReason() : status.getReasonPhrase(),
                exchange.getRequest().getPath().value()
        ));
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public Mono<ErrorResponse> handleGenericException(Exception ex, ServerWebExchange exchange) {
        log.error("Error interno: {}", ex.getMessage(), ex);
        return Mono.just(ErrorResponse.of(
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                "Internal Server Error",
                "Error interno del servidor",
                exchange.getRequest().getPath().value()
        ));
    }
}
