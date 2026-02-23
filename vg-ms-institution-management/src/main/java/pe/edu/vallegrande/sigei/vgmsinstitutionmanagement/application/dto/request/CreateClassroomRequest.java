package pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.application.dto.request;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateClassroomRequest {
    private String institutionId;
    private String classroomName;
    private String classroomAge;
    private Integer capacity;
    private String color;
}
