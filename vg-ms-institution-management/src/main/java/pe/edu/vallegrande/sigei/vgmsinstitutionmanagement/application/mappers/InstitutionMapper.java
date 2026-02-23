package pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.application.mappers;

import org.springframework.stereotype.Component;
import pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.application.dto.request.CreateInstitutionRequest;
import pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.application.dto.request.UpdateInstitutionRequest;
import pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.application.dto.response.InstitutionResponse;
import pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.domain.models.Institution;
import pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.domain.models.vo.InstitutionStatus;

import java.time.LocalDateTime;

@Component
public class InstitutionMapper {

    public Institution toDomain(CreateInstitutionRequest request) {
        return Institution.builder()
                .codeInstitution(request.getCodeInstitution())
                .modularCode(request.getModularCode())
                .name(request.getName())
                .institutionType(request.getInstitutionType())
                .institutionLevel(request.getInstitutionLevel())
                .gender(request.getGender())
                .slogan(request.getSlogan())
                .logoUrl(request.getLogoUrl())
                .address(request.getAddress())
                .contactMethods(request.getContactMethods())
                .schedules(request.getSchedules())
                .gradingType(request.getGradingType())
                .classroomType(request.getClassroomType())
                .ugel(request.getUgel())
                .dre(request.getDre())
                .directorId(request.getDirectorId())
                .status(InstitutionStatus.ACTIVE)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();
    }

    public Institution toDomain(UpdateInstitutionRequest request) {
        return Institution.builder()
                .codeInstitution(request.getCodeInstitution())
                .modularCode(request.getModularCode())
                .name(request.getName())
                .institutionType(request.getInstitutionType())
                .institutionLevel(request.getInstitutionLevel())
                .gender(request.getGender())
                .slogan(request.getSlogan())
                .logoUrl(request.getLogoUrl())
                .address(request.getAddress())
                .contactMethods(request.getContactMethods())
                .schedules(request.getSchedules())
                .gradingType(request.getGradingType())
                .classroomType(request.getClassroomType())
                .ugel(request.getUgel())
                .dre(request.getDre())
                .directorId(request.getDirectorId())
                .build();
    }

    public InstitutionResponse toResponse(Institution institution) {
        return InstitutionResponse.builder()
                .id(institution.getId())
                .codeInstitution(institution.getCodeInstitution())
                .modularCode(institution.getModularCode())
                .name(institution.getName())
                .institutionType(institution.getInstitutionType())
                .institutionLevel(institution.getInstitutionLevel())
                .gender(institution.getGender())
                .slogan(institution.getSlogan())
                .logoUrl(institution.getLogoUrl())
                .address(institution.getAddress())
                .contactMethods(institution.getContactMethods())
                .schedules(institution.getSchedules())
                .gradingType(institution.getGradingType())
                .classroomType(institution.getClassroomType())
                .ugel(institution.getUgel())
                .dre(institution.getDre())
                .directorId(institution.getDirectorId())
                .status(institution.getStatus() != null ? institution.getStatus().name() : null)
                .createdAt(institution.getCreatedAt())
                .updatedAt(institution.getUpdatedAt())
                .build();
    }
}
