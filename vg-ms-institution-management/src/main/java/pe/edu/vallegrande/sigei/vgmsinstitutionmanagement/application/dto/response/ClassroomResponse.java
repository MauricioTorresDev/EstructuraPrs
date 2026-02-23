package pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.application.dto.response;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ClassroomResponse {
    private String id;
    private String institutionId;
    private String classroomName;
    private String classroomAge;
    private Integer capacity;
    private String color;
    private String status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
