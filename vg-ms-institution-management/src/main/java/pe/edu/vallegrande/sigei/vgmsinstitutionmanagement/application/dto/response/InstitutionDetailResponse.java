package pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.application.dto.response;

import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InstitutionDetailResponse {
    private InstitutionResponse institution;
    private List<ClassroomResponse> classrooms;
}
