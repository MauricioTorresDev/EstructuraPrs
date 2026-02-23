package pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.domain.models;

import lombok.*;
import pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.domain.models.vo.ClassroomStatus;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Classroom {
    private String id;
    private String institutionId;
    private String classroomName;
    private String classroomAge;
    private Integer capacity;
    private String color;
    private ClassroomStatus status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private LocalDateTime deletedAt;
}
