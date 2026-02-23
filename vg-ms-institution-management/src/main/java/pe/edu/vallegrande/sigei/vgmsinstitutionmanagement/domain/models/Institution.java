package pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.domain.models;

import lombok.*;
import pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.domain.models.vo.Address;
import pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.domain.models.vo.ContactMethod;
import pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.domain.models.vo.InstitutionStatus;
import pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.domain.models.vo.Schedule;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Institution {
    private String id;
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
    private InstitutionStatus status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private LocalDateTime deletedAt;
}
