package pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.infrastructure.persistence.entities;

import io.r2dbc.postgresql.codec.Json;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.domain.Persistable;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table("institutions")
public class InstitutionEntity implements Persistable<UUID> {

    @Id
    @Column("institution_id")
    private UUID institutionId;

    @Column("code_institution")
    private String codeInstitution;

    @Column("modular_code")
    private String modularCode;

    @Column("institution_name")
    private String institutionName;

    @Column("institution_type")
    private String institutionType;

    @Column("institution_level")
    private String institutionLevel;

    private String gender;
    private String slogan;

    @Column("logo_url")
    private String logoUrl;

    private Json address;

    @Column("contact_methods")
    private Json contactMethods;

    private Json schedules;

    @Column("grading_type")
    private String gradingType;

    @Column("classroom_type")
    private String classroomType;

    private String ugel;
    private String dre;

    @Column("director_id")
    private UUID directorId;

    private String status;

    @Column("created_at")
    private LocalDateTime createdAt;

    @Column("updated_at")
    private LocalDateTime updatedAt;

    @Column("deleted_at")
    private LocalDateTime deletedAt;

    @Transient
    private boolean newEntry;

    @Override
    public UUID getId() {
        return institutionId;
    }

    @Override
    @Transient
    public boolean isNew() {
        return this.newEntry;
    }
}
