package pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.application.dto.request;

import lombok.*;
import pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.domain.models.vo.Address;
import pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.domain.models.vo.ContactMethod;
import pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.domain.models.vo.Schedule;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdateInstitutionRequest {
    private String codeInstitution;
    private String modularCode;
    private String name;
    private String institutionType;
    private String institutionLevel;
    private String gender;
    private String slogan;
    private String logoUrl;
    private Address address;
    private List<ContactMethod> contactMethods;
    private List<Schedule> schedules;
    private String gradingType;
    private String classroomType;
    private String ugel;
    private String dre;
    private String directorId;
}
