package pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.application.events;

public record InstitutionCreatedEvent(
        String institutionId,
        String name,
        String modularCode
) {}
