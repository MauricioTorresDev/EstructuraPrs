package pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.infrastructure.persistence.entities;

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
@Table("classrooms")
public class ClassroomEntity implements Persistable<UUID> {

    @Id
    @Column("classroom_id")
    private UUID classroomId;

    @Column("institution_id")
    private UUID institutionId;

    @Column("classroom_name")
    private String classroomName;

    @Column("classroom_age")
    private String classroomAge;

    private Integer capacity;
    private String color;
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
        return classroomId;
    }

    @Override
    @Transient
    public boolean isNew() {
        return this.newEntry;
    }
}
