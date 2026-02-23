package pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.application.events;

public record AnnouncementCreatedEvent(
        String institutionId,
        String title,
        String message,
        String targetAudience
) {}
