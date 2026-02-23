package pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.infrastructure.persistence.mappers;

import org.springframework.stereotype.Component;
import pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.domain.models.Classroom;
import pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.domain.models.vo.ClassroomStatus;
import pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.infrastructure.persistence.entities.ClassroomEntity;

import java.util.UUID;

@Component
public class ClassroomPersistenceMapper {

    public Classroom toDomain(ClassroomEntity entity) {
        return Classroom.builder()
                .id(entity.getClassroomId() != null ? entity.getClassroomId().toString() : null)
                .institutionId(entity.getInstitutionId() != null ? entity.getInstitutionId().toString() : null)
                .classroomName(entity.getClassroomName())
                .classroomAge(entity.getClassroomAge())
                .capacity(entity.getCapacity())
                .color(entity.getColor())
                .status(entity.getStatus() != null ? ClassroomStatus.valueOf(entity.getStatus()) : null)
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .deletedAt(entity.getDeletedAt())
                .build();
    }

    public ClassroomEntity toEntity(Classroom domain) {
        return ClassroomEntity.builder()
                .classroomId(domain.getId() != null ? UUID.fromString(domain.getId()) : null)
                .institutionId(domain.getInstitutionId() != null ? UUID.fromString(domain.getInstitutionId()) : null)
                .classroomName(domain.getClassroomName())
                .classroomAge(domain.getClassroomAge())
                .capacity(domain.getCapacity())
                .color(domain.getColor())
                .status(domain.getStatus() != null ? domain.getStatus().name() : null)
                .createdAt(domain.getCreatedAt())
                .updatedAt(domain.getUpdatedAt())
                .deletedAt(domain.getDeletedAt())
                .newEntry(domain.getId() == null)
                .build();
    }
}
