package pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.application.events;

public record ClassroomCreatedEvent(
        String classroomId,
        String institutionId,
        String classroomName,
        String ageGroup
) {}
