package pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.application.events;

public record InstitutionUpdatedEvent(
        String institutionId,
        String fieldsChanged
) {}
