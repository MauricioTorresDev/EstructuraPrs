package pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.application.mappers;

import org.springframework.stereotype.Component;
import pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.application.dto.request.CreateClassroomRequest;
import pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.application.dto.request.UpdateClassroomRequest;
import pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.application.dto.response.ClassroomResponse;
import pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.domain.models.Classroom;
import pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.domain.models.vo.ClassroomStatus;

import java.time.LocalDateTime;

@Component
public class ClassroomMapper {

    public Classroom toDomain(CreateClassroomRequest request) {
        return Classroom.builder()
                .institutionId(request.getInstitutionId())
                .classroomName(request.getClassroomName())
                .classroomAge(request.getClassroomAge())
                .capacity(request.getCapacity())
                .color(request.getColor())
                .status(ClassroomStatus.ACTIVE)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();
    }

    public Classroom toDomain(UpdateClassroomRequest request) {
        return Classroom.builder()
                .classroomName(request.getClassroomName())
                .classroomAge(request.getClassroomAge())
                .capacity(request.getCapacity())
                .color(request.getColor())
                .build();
    }

    public ClassroomResponse toResponse(Classroom classroom) {
        return ClassroomResponse.builder()
                .id(classroom.getId())
                .institutionId(classroom.getInstitutionId())
                .classroomName(classroom.getClassroomName())
                .classroomAge(classroom.getClassroomAge())
                .capacity(classroom.getCapacity())
                .color(classroom.getColor())
                .status(classroom.getStatus() != null ? classroom.getStatus().name() : null)
                .createdAt(classroom.getCreatedAt())
                .updatedAt(classroom.getUpdatedAt())
                .build();
    }
}
