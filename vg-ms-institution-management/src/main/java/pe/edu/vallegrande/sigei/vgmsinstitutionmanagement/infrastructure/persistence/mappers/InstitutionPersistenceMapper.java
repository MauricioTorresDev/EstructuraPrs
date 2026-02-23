package pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.infrastructure.persistence.mappers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import io.r2dbc.postgresql.codec.Json;
import org.springframework.stereotype.Component;
import pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.domain.models.Institution;
import pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.domain.models.vo.Address;
import pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.domain.models.vo.ContactMethod;
import pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.domain.models.vo.InstitutionStatus;
import pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.domain.models.vo.Schedule;
import pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.infrastructure.persistence.entities.InstitutionEntity;

import java.util.Collections;
import java.util.List;
import java.util.UUID;

@Component
public class InstitutionPersistenceMapper {

    private final ObjectMapper objectMapper;

    public InstitutionPersistenceMapper() {
        this.objectMapper = new ObjectMapper();
        this.objectMapper.registerModule(new JavaTimeModule());
    }

    public Institution toDomain(InstitutionEntity entity) {
        return Institution.builder()
                .id(entity.getInstitutionId() != null ? entity.getInstitutionId().toString() : null)
                .codeInstitution(entity.getCodeInstitution())
                .modularCode(entity.getModularCode())
                .name(entity.getInstitutionName())
                .institutionType(entity.getInstitutionType())
                .institutionLevel(entity.getInstitutionLevel())
                .gender(entity.getGender())
                .slogan(entity.getSlogan())
                .logoUrl(entity.getLogoUrl())
                .address(parseAddress(entity.getAddress() != null ? entity.getAddress().asString() : null))
                .contactMethods(parseContactMethods(entity.getContactMethods() != null ? entity.getContactMethods().asString() : null))
                .schedules(parseSchedules(entity.getSchedules() != null ? entity.getSchedules().asString() : null))
                .gradingType(entity.getGradingType())
                .classroomType(entity.getClassroomType())
                .ugel(entity.getUgel())
                .dre(entity.getDre())
                .directorId(entity.getDirectorId() != null ? entity.getDirectorId().toString() : null)
                .status(entity.getStatus() != null ? InstitutionStatus.valueOf(entity.getStatus()) : null)
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .deletedAt(entity.getDeletedAt())
                .build();
    }

    public InstitutionEntity toEntity(Institution domain) {
        UUID id = domain.getId() != null ? UUID.fromString(domain.getId()) : UUID.randomUUID();
        boolean isNew = domain.getId() == null;
        return InstitutionEntity.builder()
                .institutionId(id)
                .codeInstitution(domain.getCodeInstitution())
                .modularCode(domain.getModularCode())
                .institutionName(domain.getName())
                .institutionType(domain.getInstitutionType())
                .institutionLevel(domain.getInstitutionLevel())
                .gender(domain.getGender())
                .slogan(domain.getSlogan())
                .logoUrl(domain.getLogoUrl())
                .address(toJsonb(domain.getAddress()))
                .contactMethods(toJsonb(domain.getContactMethods()))
                .schedules(toJsonb(domain.getSchedules()))
                .gradingType(domain.getGradingType())
                .classroomType(domain.getClassroomType())
                .ugel(domain.getUgel())
                .dre(domain.getDre())
                .directorId(domain.getDirectorId() != null ? UUID.fromString(domain.getDirectorId()) : null)
                .status(domain.getStatus() != null ? domain.getStatus().name() : null)
                .createdAt(domain.getCreatedAt())
                .updatedAt(domain.getUpdatedAt())
                .deletedAt(domain.getDeletedAt())
                .newEntry(isNew)
                .build();
    }

    private Address parseAddress(String json) {
        if (json == null || json.isBlank() || json.equals("{}")) return null;
        try {
            return objectMapper.readValue(json, Address.class);
        } catch (JsonProcessingException e) {
            return null;
        }
    }

    private List<ContactMethod> parseContactMethods(String json) {
        if (json == null || json.isBlank() || json.equals("[]")) return Collections.emptyList();
        try {
            return objectMapper.readValue(json, new TypeReference<>() {});
        } catch (JsonProcessingException e) {
            return Collections.emptyList();
        }
    }

    private List<Schedule> parseSchedules(String json) {
        if (json == null || json.isBlank() || json.equals("[]")) return Collections.emptyList();
        try {
            return objectMapper.readValue(json, new TypeReference<>() {});
        } catch (JsonProcessingException e) {
            return Collections.emptyList();
        }
    }

    private String toJson(Object obj) {
        if (obj == null) return null;
        try {
            return objectMapper.writeValueAsString(obj);
        } catch (JsonProcessingException e) {
            return null;
        }
    }

    private Json toJsonb(Object obj) {
        String json = toJson(obj);
        return json != null ? Json.of(json) : null;
    }
}
